import { Dispatch } from "redux";
import { LOGOUT_USER } from "../../actions-types";

export const logoutUser = () => {
  return (dispatch: Dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
      dispatch({
      type: LOGOUT_USER
    
    });
  };
};
