// src/app/store.ts
import { createStore, combineReducers } from "redux";
import { authReducer } from "../redux/reducers/authReducer";
import themeReducer from "../redux/reducers/themeReducer";

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
