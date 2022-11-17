export const getReq = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  };
  const response = await fetch(`http://localhost:5000/${url}`, options);
  if (response.ok) {
    const dataFromGetRequest = await response.json();
    return dataFromGetRequest;
  }
};

export const postReq = async (body, url) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  };
  const response = await fetch(`http://localhost:5000/${url}`, options);
  if (response.ok) {
    const dataFromPostRequest = await response.json();
    return dataFromPostRequest;
  }
};

export const putReq = async (body, url) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  };
  const response = await fetch(`http://localhost:5000/${url}`, options);
  if (response.ok) {
    const dataFromPutRequest = await response.json();
    return dataFromPutRequest;
  }
};

export const deleteReq = async (url) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  };
  const response = await fetch(`http://localhost:5000/${url}`, options);
  if (response.ok) {
    const dataFromDeleteRequest = await response.json();
    return dataFromDeleteRequest;
  }
};
