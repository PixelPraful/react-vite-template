const initialState = {
  theme: "light",
};

const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case "SET_LIGHT_THEME":
      return {
        ...state,
        theme: "light",
      };
    case "SET_DARK_THEME":
      return {
        ...state,
        theme: "dark",
      };
    default:
      return state;
  }
};

export default themeReducer;
