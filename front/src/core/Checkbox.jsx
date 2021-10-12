import React, { useState, useEffect } from "react";

//categories viene de shop
const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  //high order function
  //async category: nos va a dar la id en la primer funcion
  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c); // return the 1st index or -1
    const newCheckedCategoryId = [...checked];
    // si el check actualmente no esta en el estado de check, entonces pusheamos.
    //sino
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId) //estos son los filtros
  };

  return categories.map((c, index) => (
    <li className="list-unstyled" key={index}>
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf((c._id === -1))}
        type="checkbox"
        className="form-check-input" 
      />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default Checkbox;
