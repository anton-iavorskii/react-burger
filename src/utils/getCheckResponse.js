const getCheckResponse = (response) => {
  if (response.status !== 200) {
    return new Error(response.statusText);
  } else {
    return response;
  }
};

export default getCheckResponse;
