import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createAProduct, getCategories } from "./ApiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "errorsin",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  const { user, token } = isAuthenticated();

  useEffect(() => {
    init(); //ademas de actualizarse, pobla la form data tambien que va hacia el backend para el nuevo producto
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createAProduct(user._id, token, formData).then((data) => {
      console.log(data, "soy data");
      if (data.error) {
        console.log(data.error, "soy data error");
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createProduct: data.name,
        });
      }
    });
  };

  const showError = () => {
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>;
  };

  const showSuccess = () => {
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2> {`${createdProduct}`} is created!</h2>
    </div>;
  }

  const showLoading = () => {
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );
  };

  return (
    <Layout
      title="Add a new Product"
      description={`Good day ${user.name}!, ready to add a new Product for today?`} //fluid, change the width of the graphic window
    >
      <div className="row">
        <div className="col-8 offset-md-2">
          {}

            {showSuccess()} {/* por que no me aparece */}
            {showError()} {/* por que no me aparece */}
            {showLoading()} {/* por que no me aparece */}

          <form className="mb-3" onSubmit={clickSubmit}>
            
            <h4>Post Photo</h4>
            <div className="form-group">
              <label className="btn btn-secondary">
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  name="photo"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                onChange={handleChange("name")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Description</label>
              <textarea
                onChange={handleChange("description")}
                type="text"
                className="form-control"
                value={description}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Price</label>
              <input
                onChange={handleChange("price")}
                type="number"
                className="form-control"
                value={price}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Category</label>
              <select
                onChange={handleChange("category")}
                type="number"
                className="form-control"
              >
                <option>Please select</option>

                {categories &&
                  categories.map((categories, index) => (
                    <option key={index} value={categories._id}>
                      {categories.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label className="text-muted">Quantity</label>
              <input
                onChange={handleChange("quantity")}
                type="number"
                className="form-control"
                value={quantity}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Shipping</label>
              <select
                onChange={handleChange("shipping")}
                className="form-control"
              >
                <option>Please select </option>

                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <button className="btn btn-outline-primary">Create product</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
