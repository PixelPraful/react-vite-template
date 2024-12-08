import { LOGIN, LOGOUT } from "./actionTypes";

export const login = (user: { username: string; role: string }) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
