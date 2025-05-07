import axios from 'axios';
import { Dispatch } from 'redux';
import { FETCH_PROMOTIONS, AUTH_ERROR, LOADING_END, LOADING_START} from '../../actions-types';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const startLoading = () => ({
  type: LOADING_START
});

export const endLoading = () => ({
  type: LOADING_END
});

export const fetchPromotions = () => {
  return async (dispatch: Dispatch) => {
    try {

      dispatch(startLoading());

      const response = await axios.get(`${API_URL_BASE}/promotions`);
      dispatch({
        type: FETCH_PROMOTIONS,
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

      dispatch(endLoading());
    }
  };

};