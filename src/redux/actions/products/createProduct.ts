import axios from "axios";
import Swal from "sweetalert2";
import { CREATE_PRODUCT, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';
import { ProductPost } from '../../../interfaces/Interfaces';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
const showSuccess = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "¡Registro exitoso!",
    showConfirmButton: false,
    timer: 1500,
    width: '250px',
    toast: true
  })
};

export const createProduct = (productData: ProductPost) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      const response = await axios.post(`${API_URL_BASE}/products/create`, productData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
       dispatch({
        type: CREATE_PRODUCT,
        payload: response.data.data,
      });
      showSuccess();

    } catch (error) {
      let errorMessage = "Error de registro desconocido";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: AUTH_ERROR,
        payload: errorMessage,
      });
    }
  };
};