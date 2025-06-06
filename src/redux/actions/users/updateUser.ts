import axios from "axios";
import { UPDATE_USER, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';
import { IUser } from "../../../interfaces/Interfaces";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const updateUser = (id: string, userData: Partial<IUser>) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      
      const response = await axios.put(`${API_URL_BASE}/users/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      dispatch({
        type: UPDATE_USER,
        payload: response.data.data
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
    }
  };
};