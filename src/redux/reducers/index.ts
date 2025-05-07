import { combineReducers } from "redux";
import authReducer from "./authReducer" // Importa el reducer de autenticación
import productsReducer from "./productsReducer" // Importa el reducer de productos
import dashboardReducer from "./dashboardReducer"

// Combina todos los reducers en uno solo
const rootReducer = combineReducers({
  auth: authReducer, 
  products: productsReducer,
  dashboard: dashboardReducer,
 
});

// Exporta el tipo RootState, que representa todo el estado global de Redux
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;