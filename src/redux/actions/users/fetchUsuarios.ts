import axios from 'axios';
import { Dispatch } from 'redux';
import { FETCH_USUARIOS, AUTH_ERROR, LOADING_END, LOADING_START} from '../../actions-types';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const startLoading = () => ({
  type: LOADING_START
});

export const endLoading = () => ({
  type: LOADING_END
});

export const fetchUsuarios = () => {
  return async (dispatch: Dispatch) => {
    try {

      dispatch(startLoading());
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }

      const response = await axios.get(`${API_URL_BASE}/users`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      dispatch({
        type: FETCH_USUARIOS,
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
        payload: errorMessage
      });

      dispatch(endLoading());
    }
  };

};