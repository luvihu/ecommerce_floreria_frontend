import { 
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FETCH_USUARIOS,
  DELETE_USUARIO,
  USER_ID,
  UPDATE_USER,
  AUTH_ERROR,
  LOADING_START,
  LOADING_END
  } from "../actions-types";
   import { UserAuth, IUser } from '../../interfaces/Interfaces';
import { AnyAction } from "redux";

export interface AuthState {
  user: UserAuth | null;
  userById: IUser | null;
  users: IUser[] | null;
  token: string | null,
  rol: 'ADMIN' | 'USER'| null,
  isLoggedIn: boolean,
  error: string | null,
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  userById: null,
  users: [],
  token: null,
  rol: null,
  isLoggedIn: false,
  error: null,
  loading: false
 };

const authReducer = (state = initialState, action: AnyAction):  AuthState => {
  console.log("action.type", action.type);
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case LOADING_END:
      return {
        ...state,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AUTH_USER:
       return {
        ...state,
        user: action.payload.user,
        userById: action.payload,
        token: action.payload.token,
        rol: action.payload.rol,
        isLoggedIn: true,
        error: null,
       };
    case LOGIN_USER:
      return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          rol: action.payload.rol,
          isLoggedIn: true,
          error: null,
      };
    case LOGOUT_USER:
      return initialState;

    case REGISTER_USER:
      return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          rol: action.payload.rol,
          isLoggedIn: true,
          error: null,
      };

    case USER_ID:
      return {
          ...state,
          userById: action.payload,
          isLoggedIn: true,
          error: null,
        };

    case UPDATE_USER:
      return {
          ...state,
          user: state.user && state.user.id ===  action.payload.id ? action.payload : state.user,
          userById: state.userById && state.userById.id ===  action.payload.id ? action.payload : state.userById,
          users: state.users && state.users.map((user) => user.id === action.payload.id ? action.payload : user),
          isLoggedIn: true,
          error: null,
      };
    case FETCH_USUARIOS:
      return {
          ...state,
          users: action.payload,
          isLoggedIn: true,
          error: null,
      };
    case DELETE_USUARIO:
      return {
          ...state,
          users: state.users && state.users.filter((user) => user.id !== action.payload.id),
          isLoggedIn: true,
          error: null,
      };
    default:
    return state;
  }
};
export default authReducer;