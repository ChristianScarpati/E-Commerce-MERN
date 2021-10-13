import { API } from "../config";
import queryString from "query-string";

export const getProducts = async (sortBy) => {
  return await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFilteredProducts = (skip, limit, filters = {}) => { 
  //we make a post request to get all products based on the filters
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`${API}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}; 

export const list = (params) => {     // this method gave us all the products based on the query parameter
  const query = queryString.stringify(params); //npm i querystring = we cann send the proper query string
  console.log(query, "query");
  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })  
    .then(response => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const read = (productId) => {
  return fetch(`${API}/product/${productId}`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listRelated = (productId) => {
  return fetch(`${API}/products/related/${productId}`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};