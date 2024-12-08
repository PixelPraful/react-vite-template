import { API_VERSION } from "../../utils/constants";

const BASE_URL =
  process.env.REACT_APP_BUILD_ENV === "prod"
    ? "https://api.freelanceflow.app/"
    : "http://ec2-13-60-76-113.eu-north-1.compute.amazonaws.com:8081/";

export const USER_LOGIN_URL = `${BASE_URL}auth/${API_VERSION}/login`;
export const USER_SIGNUP_URL = `${BASE_URL}auth/user/${API_VERSION}/sign-up`;
export const USER_LOGOUT_URL = `${BASE_URL}user/${API_VERSION}/logout`;
export const REFRESH_TOKEN_URL = `${BASE_URL}auth/token/${API_VERSION}/refresh`;
