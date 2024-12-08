import { TOGGLE_THEME } from "../actions/actionTypes";
import { initialState } from "./initialState";

const themeReducer = (currentState = initialState.theme, action: any) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return currentState === "light" ? "dark" : "light";
    default:
      return currentState;
  }
};

export default themeReducer;
