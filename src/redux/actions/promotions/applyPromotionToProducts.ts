import axios from 'axios';
import { Dispatch } from 'redux';
import { 
  APPLY_PROMOTION_PRODUCTS, 
  AUTH_ERROR,
  LOADING_START, 
  LOADING_END 
} from '../../actions-types';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const startLoading = () => ({
  type: LOADING_START
});

export const endLoading = () => ({
  type: LOADING_END
});

export const applyPromotionToProducts = (promotionId: string, productIds: string[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading());
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      };
      
      await axios.post(
        `${API_URL_BASE}/promotions/${promotionId}/apply`, { productIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      
      dispatch({
        type: APPLY_PROMOTION_PRODUCTS,
        payload: {
          promotionId,
          productIds
        }
      });
      
      dispatch(endLoading());
           
    } catch (error) {
      let errorMessage = "Error al aplicar la promoción a los productos";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      dispatch({
        type: AUTH_ERROR,
        payload: errorMessage
      });
      
      dispatch(endLoading());
      throw error;
    }
  };
};
