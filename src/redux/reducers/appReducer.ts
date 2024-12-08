import * as types from "../actions/actionTypes";
import { initialState } from "./initialState";

interface appActions {
  type: string;
  payload: any;
}

interface appState {
  errorMessage: "";
  successMessage: "";
}

export default function appReducer(
  currentState: appState,
  action: appActions
): any {
  const state = currentState || initialState.app;
  switch (action.type) {
    case types.SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      };

    case types.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
}
