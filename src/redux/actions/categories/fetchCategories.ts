import axios from 'axios';
import { Dispatch } from 'redux';
import { FETCH_CATEGORIES, SET_SELECTED_CATEGORY, AUTH_ERROR} from '../../actions-types';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${API_URL_BASE}/categories`);
      dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data.data,
      });
    } catch (error) {
      let errorMessage = "Error desconocido";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: AUTH_ERROR,
        payload: errorMessage
      });
    }
  };

};
// Acción para establecer la categoría seleccionada
export const setSelectedCategory = (categoryId: string | null) => {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: categoryId
  };
};