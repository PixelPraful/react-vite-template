import axios, { AxiosRequestConfig } from "axios";
import * as config from "./config";
import {
  ACCESS_TOKEN,
  GLOBAL_FETCH_TIMEOUT,
  REFRESH_TOKEN,
  TEMPORARY_TOKEN,
} from "../../utils/constants";
import { ROUTE_SIGNIN } from "../../utils/routes";
import { isEqual } from "lodash";

interface Response {
  code: number;
  message: string;
  errors: any;
  status: number;
  data: any;
}

const checkForErrorMsg = (response: Response, ref: Response): any => {
  const retObj: any = { error: false, errorMsg: "" };
  if (
    !(response.code >= 200 && response.code <= 299) &&
    !(ref.status >= 200 && ref.status <= 299)
  ) {
    retObj.error = true;
    retObj.code = response.code;
    retObj.errorMsg = response.message || response.errors;
  }
  return retObj;
};

const fetchTimeout = async (value: number): Promise<any> => {
  return await new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Sorry, request timed out."));
    }, value);
  });
};

const middleware = async (
  endpoint: string,
  method: any,
  extraHeaders?: any,
  payload?: any,
  isNotJSON?: any,
  allowToken = true,
  useAccessToken = true
): Promise<any> => {
  return await new Promise((resolve, reject) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const tempToken = localStorage.getItem(TEMPORARY_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const allHeaders = {
      ...extraHeaders,
    };

    if (tempToken && allowToken && useAccessToken) {
      allHeaders.Authorization = `Bearer ${tempToken}`;
    } else if (accessToken && allowToken && useAccessToken) {
      allHeaders.Authorization = `Bearer ${accessToken}`;
    } else if (refreshToken && allowToken && !useAccessToken) {
      allHeaders.Authorization = `Bearer ${refreshToken}`;
    }

    if (typeof window !== "undefined") {
      const headers = new Headers();
      Object.keys(allHeaders).forEach((key) => {
        headers.append(key, allHeaders[key]);
      });

      let responseRef: any = null;

      let body: any;
      if (!isEqual(method, "GET")) {
        body = isNotJSON ? payload : JSON.stringify(payload);
      }

      Promise.race([
        fetchTimeout(GLOBAL_FETCH_TIMEOUT),
        fetch(endpoint, {
          headers,
          method,
          body,
        }),
      ])
        .then(async (res: any) => {
          responseRef = res;
          if (res.status === 401 && tempToken) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace(ROUTE_SIGNIN);
          } else if (res.status === 401 && refreshToken && useAccessToken) {
            // Request a new access token using the refresh token
            try {
              const refreshResponse = await fetch(config.REFRESH_TOKEN_URL, {
                method: "POST",
                headers: { "x-refresh-token": refreshToken },
              });
              const refreshData = await refreshResponse.json();

              localStorage.setItem(TEMPORARY_TOKEN, refreshData?.result);
              const retryReponse = await fetch(endpoint, {
                method,
                headers: {
                  ...allHeaders,
                  Authorization: `Bearer ${refreshData?.result as string}`,
                },
                body,
              });
              return await retryReponse.json();
            } catch (error: any) {
              console.warn(error);
            }
          }
          if (typeof res === "object" && endpoint === config.USER_LOGOUT_URL) {
            return res;
          }
          return res.json();
        })
        .then((response) => {
          const errorObj = checkForErrorMsg(response, responseRef);
          if (errorObj.error) {
            reject(errorObj);
          } else {
            resolve(response);
          }
        })
        .catch((err) => {
          console.warn(err);
          reject(err);
        });
    } else {
      const config: AxiosRequestConfig = {
        headers: allHeaders,
        url: endpoint,
        data: payload,
        method,
      };
      axios(config)
        .then((response: any) => {
          const { data } = response;
          const errorObj = checkForErrorMsg(data, response);
          if (errorObj.error) {
            reject(errorObj);
          } else {
            resolve(data);
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    }
  });
};

export default middleware;
