const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export async function post(path, body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`${BASE_URL}${path}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export async function get(path) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const data = await fetch(`${BASE_URL}${path}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return data
}


export async function patch(path, body) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(body);

  const requestOptions = {
    method: 'PATCH', // Use PATCH method for partial updates
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };


  const data = await fetch(`${BASE_URL}${path}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return data

}

export async function remove(path) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  const data = await fetch(`${BASE_URL}${path}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return data
}
