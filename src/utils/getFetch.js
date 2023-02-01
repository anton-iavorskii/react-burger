import { BASE_URL } from './consts';
import getCheckResponse from './getCheckResponse';

const getFetch = async (url, body) => {
  let response = null;
  try {
    if (body) {
      response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } else {
      response = await fetch(BASE_URL + url);
    }

    const checkResponse = await getCheckResponse(response);
    const data = await checkResponse.json();
    return data;
  } catch (error) {
    alert('error-fetch!' + ' >>> ' + error);
  }
};

export default getFetch;
