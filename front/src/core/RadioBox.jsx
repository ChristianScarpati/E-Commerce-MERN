import React, {useState, useEffect, Fragment} from 'react'

const RadioBox = ({prices, handleFilters}) => {

    const [value, setValue]= useState(0)

    const handleChange = (e) => {
    console.log(handleFilters, "lala")
        handleFilters(e.target.value)
        setValue(e.target.value)
    }

    return prices.map((p, index) => (
        <div key={index}>
          <input
            onChange={handleChange}
            name={p}
            value={`:${p._id}`}
            type="radio"
            className="mr-2 ml-4" 
          />
          <label className="form-check-label">{p.name}</label>
        </div>
      ));
}

export default RadioBox
