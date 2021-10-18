export const addItem = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart")); //json to object
    }
    cart.push({
      ...item,
      count: 1,
    });

    //avoid duplicated items

    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    // next();
  }
};

//Total items in the cart

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getCart = () => {
  //obtenemos el cart desde el localstorage
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const updateItem = (productId, count) => {
  //count could be 1,2,3, etc.
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    });
    //save it to localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
     //count could be 1,2,3, etc.
     let cart = [];
     if (typeof window !== "undefined") {
       if (localStorage.getItem("cart")) {
         cart = JSON.parse(localStorage.getItem("cart"));
       }
       cart.map((product, i) => {
         if (product._id === productId) {
           cart.splice(i, 1)
         }
       });
       //save it to localstorage
       localStorage.setItem("cart", JSON.stringify(cart));
     }
     return cart
   };


/* 
                                              !EXPLANATION of const = addItem!
          ~ remove duplicates
          ~ build an Array from new Set and turn it back into array using Array.from
          ~ so that later we can re-map it
          ~ new set will only allow unique values in it
          ~ so pass the ids of each object/product
          ~ if the loop tries to add the same value again, it will get ignored
          ~...with the array of ids we got on when first map () was used
          ~ run map() on it again and return the actual product from the cart

    */
