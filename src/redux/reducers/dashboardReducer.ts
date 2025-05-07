import {
  DASHBOARD_SUMMARY,
  LOADING_START,
  LOADING_END,
  AUTH_ERROR,
  FETCH_IMAGES,
  DELETE_IMAGES,
  SET_SELECTED_IMAGE,
  UPLOAD_PRODUCT_IMAGE

} from "../actions-types";          
import { AnyAction } from "redux";
import { ImageDashboard } from '../../interfaces/Interfaces';

interface DashboardState {
  totalProducts: number;
  totalUsers: number;
  totalCategories: number;
  totalPromotions: number;
  newProductsThisMonth: number;
  activePromotions: number;
  topCategory: string | null;
  mostExpensiveProduct: {
    nombre: string | null;
    precio: number;
  };
  biggestPromotion: {
    nombre: string | null;
    descuento: number;
  };
  productImages: ImageDashboard[];
  loading: boolean;
  error: string | null
};

const initialState: DashboardState = {
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
};

const dashboardReducer = (state = initialState, action: AnyAction): DashboardState => {
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
      case AUTH_ERROR:
        return {
          ...state,
          error: action.payload,
        };
    case DASHBOARD_SUMMARY:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case FETCH_IMAGES:
      return {
        ...state,
        productImages: action.payload,
        loading: false,
      };
    case DELETE_IMAGES:
      return {
          ...state,
          productImages: state.productImages.filter(image => image.id !== action.payload),
          loading: false,
        };
    case SET_SELECTED_IMAGE:
      return {
        ...state,
        productImages: state.productImages.map(image =>
          image.id === action.payload.id ? action.payload : image
        ),
        loading: false,
      };
    case UPLOAD_PRODUCT_IMAGE:
      return {
        ...state,
        productImages: [...state.productImages, action.payload],
        loading: false,
      };
    default:
      return state;
  };
};
  export default dashboardReducer;