import axios from "axios";
import { UPDATE_PRODUCTS, AUTH_ERROR,LOADING_END, LOADING_START } from "../../actions-types";
import { Dispatch } from 'redux';
import Swal from "sweetalert2";
import { Product } from "../../../interfaces/Interfaces";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const startLoading = () => ({
  type: LOADING_START
});

export const endLoading = () => ({
  type: LOADING_END
});
const showSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "¡Producto actualizado exitosamente!",
    showConfirmButton: false,
    timer: 2000,
    width: '300px',
    background: '#f0f8ff',
    toast: true
  })
};

export const updateProduct = (id: string, updateData: Partial<Product>) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading());
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }

        const response = await axios.put(`${API_URL_BASE}/products/${id}`, updateData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
        type: UPDATE_PRODUCTS,
        payload: response.data.data,
      });
      showSuccess();

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