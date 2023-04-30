import { BASE_URL } from "./consts";
import { checkResponse } from "./getCheckResponse";

export const refreshToken = () => {
  return fetch(`${BASE_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (
  url: string,
  options: RequestInit & {
    headers: { authorization: string };
    ["Content-Type"]: string;
  }
) => {
  options["Content-Type"] = "application/json";
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
