import { BASE_URL } from "./consts";
import { checkResponse } from "./getCheckResponse";

const getFetch = async (url: string, body: Body) => {
  let response = null;
  try {
    if (body) {
      response = await fetch(BASE_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } else {
      response = await fetch(BASE_URL + url);
    }

    const data = await checkResponse(response);

    return data;
  } catch (error) {
    alert("error-fetch!" + " >>> " + error);
  }
};

export default getFetch;
