import axios from "axios";
import {  FETCH_IMAGES, AUTH_ERROR, LOADING_END, LOADING_START } from "../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const startLoading = () => ({
  type: LOADING_START
});
export const endLoading = () => ({
  type: LOADING_END
});

export const fetchProductImages = (productId: string) => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem('token');
    if(!token) {
      throw new Error("No se proporcionó un token de autenticación");
    };

    try {
      dispatch(startLoading());
      const response = await axios.get(`${API_URL_BASE}/images/products/${productId}/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      dispatch({
        type: FETCH_IMAGES,
        payload: response.data.data,
      });
      dispatch(endLoading());
      
    } catch (error) {
      let errorMessage = "Error desconocido";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: AUTH_ERROR,
        payload: errorMessage,
      });
      dispatch(endLoading());
    }
  };
};