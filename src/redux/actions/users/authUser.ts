import axios, { AxiosError} from 'axios';
import { AUTH_USER, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const authUser = (token: string) => {
    return async (dispatch: Dispatch) => {
        try {
              if (!token) {
                throw new Error("No hay token en localStorage");
              };
            const response = await axios.get(`${API_URL_BASE}/verifyToken`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userData = response.data.user;
            console.log("Datos del usuario en authUser:", userData);

            if(!userData.rol) {
                throw new Error("El usuario no tiene un rol asignado");
            };
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            localStorage.setItem("rol", userData.rol);

            dispatch({
                type: AUTH_USER,
                payload: {
                    user: userData,
                    token: token,
                    rol: userData.rol
                }
            });
                        
        } catch (error) {
          let errorMessage = "Error de autenticación desconocido";
            
          if (error instanceof AxiosError) {
              errorMessage = error.response?.data?.message || "Error de autenticación";
          }
          dispatch({
              type: AUTH_ERROR,
              payload: errorMessage
          });

        }
    };
};
