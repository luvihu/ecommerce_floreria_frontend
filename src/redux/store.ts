import { createStore, applyMiddleware, compose, Store, AnyAction } from "redux";
import rootReducer, { RootState } from "./reducers/index"; 
import { thunk, ThunkDispatch } from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 📌 Función para cargar el estado publico y estado privado desde localStorage
// Función mejorada para cargar el estado desde localStorage
const loadState = () => {
  try {
    // Cargar datos de autenticación
    const token = localStorage.getItem("token");
    const authData = token ? {
      user: JSON.parse(localStorage.getItem("user") || "null"),
      token,
      rol: (localStorage.getItem("rol") as "ADMIN" | "USER" | null) || null,
      isLoggedIn: true,
      error: null
    } : {
      user: null,
      token: null,
      rol: null,
      isLoggedIn: false,
      error: null
    };
    
    // Cargar carrito de compras (para usuarios anónimos y registrados)
    // const cartItems = localStorage.getItem("cart") 
    //   ? JSON.parse(localStorage.getItem("cart") || "[]") 
    //   : [];
      
    // Cargar productos vistos recientemente
    const recentlyViewed = localStorage.getItem("recentlyViewed")
      ? JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
      : [];
    
    return {
      auth: authData,
      // cart: { items: cartItems },
      user: { recentlyViewed }
    };
  } catch (error) {
    console.error("Error al cargar el estado:", error);
    return { 
      auth: {
        user: null,
        token: null,
        rol: null,
        isLoggedIn: false,
        error: null
      },
      // cart: { items: [] },
      user: { recentlyViewed: [] }
    };
  }
};

// Estado inicial con datos persistentes
const persistedState = {
  auth: {
    user: loadState().auth.user,
    userById: null,
    users: [],
    token: loadState().auth.token,
    rol: loadState().auth.rol,
    isLoggedIn: loadState().auth.isLoggedIn || false,
    error: null,
    loading: false,
  },
   // Inicializar el estado de productos
  products: {
    promotions: [],
    categories: [],
    filteredProducts: [],
    products: [],
    productById: null,
    selectedCategory: null,
    error: null,
    loading: false,
    },
  dashboard: {
    totalProducts: 0,
    totalUsers: 0,
    totalCategories: 0,
    totalPromotions: 0,
    newProductsThisMonth:
    new Date().getMonth() === 0 ? 0 : 0,
    activePromotions: 0,
    topCategory: null,
    mostExpensiveProduct: {
      nombre: null,
      precio: 0
    },
    biggestPromotion: {
      nombre: null,
      descuento: 0
    },
    productImages: [],
    loading: false,
    error: null,
  }
};

const store: Store<RootState, AnyAction> = createStore(
  rootReducer,
  persistedState,
  composeEnhancer(applyMiddleware(thunk))
);

// Suscripción mejorada para guardar cambios en localStorage
store.subscribe(() => {
  try {
    const { auth } = store.getState();
    
    // Persistir carrito para todos los usuarios (anónimos y registrados)
    // localStorage.setItem("cart", JSON.stringify(cart.items));
    
    // Persistir productos vistos recientemente
    // localStorage.setItem("recentlyViewed", JSON.stringify(user.recentlyViewed));
    
    // Persistir datos de autenticación solo si está logueado
    if (auth.isLoggedIn && auth.token) {
      localStorage.setItem("user", JSON.stringify(auth.user));
      localStorage.setItem("token", auth.token || "");
      localStorage.setItem("rol", auth.rol || "");
    } else {
      ["user", "token", "rol"].forEach(key => localStorage.removeItem(key));
    }
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
});


export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
export type { RootState };
export default store;
