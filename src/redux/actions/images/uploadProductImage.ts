import axios from "axios";
import {  UPLOAD_PRODUCT_IMAGE, AUTH_ERROR, LOADING_END, LOADING_START } from "../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const startLoading = () => ({
  type: LOADING_START
});
export const endLoading = () => ({
  type: LOADING_END
});
// Función auxiliar para convertir File a base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};  

export const uploadProductImage = (params: {
  productId: string,
  imageData: {
    image: string | File,
    alt_text?: string,
    principal?: boolean
  }
}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading());
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
     
      let imageBase64: string;
      
      // Convertir a base64 solo si es un objeto File
      if (params.imageData.image instanceof File) {
        imageBase64 = await fileToBase64(params.imageData.image);
      } else {
        imageBase64 = params.imageData.image as string;
      }
      
      const response = await axios.post(
        `${API_URL_BASE}/images/products/${params.productId}/images`, 
        { 
          image: imageBase64,
          alt_text: params.imageData.alt_text,
          principal: params.imageData.principal
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      dispatch({
        type: UPLOAD_PRODUCT_IMAGE,
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
  }
};
