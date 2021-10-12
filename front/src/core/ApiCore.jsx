import { API } from "../config";


export const getProducts = async (sortBy) => {
    return (
      await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log(err);
        })
    );
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