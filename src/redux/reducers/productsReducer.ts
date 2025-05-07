import { 
  FETCH_CATEGORIES, 
  FETCH_PRODUCTS,
  SET_SELECTED_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_PRODUCTS_BYID,
  LOADING_START,
  LOADING_END,
  UPDATE_PRODUCTS,
  DELETE_PRODUCTS,
  CREATE_PRODUCT,
  FETCH_PROMOTIONS,
  DELETE_PROMOTION,
  CREATE_PROMOTION,
  UPDATE_PROMOTION,
  APPLY_PROMOTION_PRODUCTS,
  AUTH_ERROR 
  } from "../actions-types";
   import { Category, Product, Promotion} from '../../interfaces/Interfaces';
import { AnyAction } from "redux";

export interface AuthState {
  promotions: Promotion[];
  categories: Category[];
  filteredProducts: Product[];
  products: Product[];
  productById: Product | null;
  selectedCategory: string | null;
  error: string | null;
  loading: boolean;
 }

const initialState: AuthState = {
  promotions: [],
  categories: [],
  filteredProducts: [],
  products: [],
  productById: null,
  selectedCategory: null,
  error: null,
  loading: false,
 };

const productsReducer = (state = initialState, action: AnyAction):  AuthState => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case LOADING_END:
      return {
        ...state,
        loading: false,
      };
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
      };
    case UPDATE_CATEGORY:
      return {
          ...state,
          categories: state.categories.map(category =>
            category.id === action.payload.id ? action.payload : category
          ),
          loading: false
        };
    case DELETE_CATEGORY:
      return {
          ...state,
          categories: state.categories.filter(category => category.id !== action.payload.id),
          loading: false,
        };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        loading: false,
      };
    case FETCH_PRODUCTS_BYID:
      return {
          ...state,
          productById: action.payload,
          loading: false,
        };
    case SET_SELECTED_CATEGORY:
      return {
          ...state,
          selectedCategory: action.payload,
        };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product ),
        loading: false,
      };
    case DELETE_PRODUCTS:
      return {
          ...state,
          products: state.products.filter(product => product.id !== action.payload.id),
          loading: false,
      };
    case FETCH_PROMOTIONS:
      return {
        ...state,
        promotions: action.payload,
        loading: false,
      };
    case CREATE_PROMOTION:
      return {
        ...state,
        promotions: [...state.promotions, action.payload],
        loading: false,
      };
    case DELETE_PROMOTION:
      return {
          ...state,
          promotions: state.promotions.filter(promotion => promotion.id !== action.payload.id),
          loading: false,
        };
    case UPDATE_PROMOTION:
      return {
            ...state,
            promotions: state.promotions.map(promotion =>
              promotion.id === action.payload.id ? action.payload : promotion
            ),
            loading: false,
          };
          case APPLY_PROMOTION_PRODUCTS:
  return {
    ...state,
    promotions: state.promotions.map(promotion => {
      if (promotion.id === action.payload.promotionId) {
        // Crear un nuevo array de productos combinando los existentes con los nuevos
        const existingProducts = promotion.products || [];
        const newProducts = action.payload.productIds
          .filter((id: string) => !existingProducts.some(p => (typeof p === 'string' ? p : p.id) === id))
          .map((id: string) => ({ id })); // Solo guardamos el ID si no tenemos el objeto completo
        
        return {
          ...promotion,
          products: [...existingProducts, ...newProducts]
        };
      }
      return promotion;
    }),
    loading: false,
  };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default productsReducer;