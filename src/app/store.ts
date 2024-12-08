import { createStore, combineReducers } from "redux";
import { authReducer } from "../redux/reducers/authReducer";
import themeReducer from "../redux/reducers/themeReducer";
import appReducer from "../redux/reducers/appReducer";
import ajaxStatusReducer from "../redux/reducers/ajaxStatusReducer";

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  app: appReducer,
  ajaxStatusReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
