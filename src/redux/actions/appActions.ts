import { SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE } from "./actionTypes";

export const setErrorMessage = (payload: string): any => {
  return { type: SET_ERROR_MESSAGE, payload };
};

export const setSuccessMessage = (payload: string): any => {
  return { type: SET_SUCCESS_MESSAGE, payload };
};
