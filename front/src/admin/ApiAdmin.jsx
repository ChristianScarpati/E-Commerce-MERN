import { API } from "../config";

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category), //como no acepta js el back le mandamos un json
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createAProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept:
        "application/json" /* sin content type porque tenemos que mandar la font data (image) */,
      Authorization: `Bearer ${token}`,
    },
    body: product, //como no acepta js el back le mandamos un json
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  return (
    fetch(`${API}/categories`)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      })
  );
};

export const signin = (user) => {
  // console.log(user)
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), //como no acepta js el back le mandamos un json
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("Jasonwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("Jasonwt");
    next();
    //hacemos el req para el backend sobre el logout
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log("error", err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    //necesitamos al objeto window para hacer algo aquí
    return false;
  }
  if (localStorage.getItem("Jasonwt")) {
    return JSON.parse(localStorage.getItem("Jasonwt")); //parse : Json format.
  } else {
    return false;
  }
};

export default createCategory;
