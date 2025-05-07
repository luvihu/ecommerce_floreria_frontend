import axios from "axios";
import { DELETE_PRODUCTS, AUTH_ERROR,LOADING_END, LOADING_START } from "../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const startLoading = () => ({
  type: LOADING_START
});

export const endLoading = () => ({
  type: LOADING_END
});

export const deleteProduct = (id: string ) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading());
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }

        const response = await axios.delete(`${API_URL_BASE}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
        type: DELETE_PRODUCTS,
        payload: response.data.data,
      });
      
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