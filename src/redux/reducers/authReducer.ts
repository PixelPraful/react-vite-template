import { LOGIN, LOGOUT } from "../actions/actionTypes";
import { initialState } from "./initialState";

export function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}
