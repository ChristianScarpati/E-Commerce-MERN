import React, { useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./ApiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./FixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState(0);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    //the filters that we get from the handle filters
    // console.log(newFilters)
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    //the filters that we get from the handle filters
    let toSkip = skip + limit;

    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5 center">
          Load More
        </button>
      )
    );
  };

  React.useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log('shop', filters, filterBy)
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        //pasamos a numeros los preciosej. 10,19.
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Welcome to the Shop"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="mb-5 col-3" style={{marginTop:"100px"}}>
          <h4 >Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by Price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-9">
          <h1 className="mb-5 text-center">Products</h1>
          {
            <div className="row">
              
              <div className="row">
                {filteredResults &&
                  filteredResults.map((product, i) => (
                    <div key={i} className="col-4 mb-3" style={{width:"1200px"}}>
                      <Card product={product} />
                    </div>
                  ))}
              </div>
              <hr />
              {loadMoreButton()}
            </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
