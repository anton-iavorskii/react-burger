import { BASE_URL } from "./consts";
import { checkResponse } from "./getCheckResponse";

export const request = (url: string, options: RequestInit) => {
  return fetch(BASE_URL + url, options).then(checkResponse);
};

export default request;
