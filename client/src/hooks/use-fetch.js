const useFetch = ({ httpLink, method, headers, body }) => {
  const postFetchData = async () => {
    const response = await fetch(httpLink, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    return response;
  };
  const response = postFetchData();
  return {
    response,
  };
};

export default useFetch;
