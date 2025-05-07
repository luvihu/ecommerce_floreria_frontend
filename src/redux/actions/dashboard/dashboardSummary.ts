import { Dispatch } from "redux";
import { AUTH_ERROR, DASHBOARD_SUMMARY, LOADING_START, LOADING_END } from "../../actions-types";
import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

// Acción para iniciar la carga
export const startLoading = () => ({
  type: LOADING_START
});

// Acción para finalizar la carga
export const endLoading = () => ({
  type: LOADING_END
});

 export const dashboardSummary = () => {
    return async (dispatch: Dispatch) => {
        try {
          dispatch(startLoading());

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token no encontrado");
            }
          const response = await axios.get(`${API_URL_BASE}/admin`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          console.log("Respuesta del servidor, dashboardSummary:", response.data.data);
          dispatch({
                type: DASHBOARD_SUMMARY,
                payload: response.data.data,
            });
        } catch (error) {
            let errorMessage = "Error de DashboardData desconocido";
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