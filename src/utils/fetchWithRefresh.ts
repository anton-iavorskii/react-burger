import request from "./request";

export const refreshToken = () => {
  return request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
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
    request(url, options);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      request(url, options); //повторяем запрос
    } else {
      return Promise.reject(err);
    }
  }
};
