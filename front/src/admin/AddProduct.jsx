import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import createAProduct from "./ApiAdmin";

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
    error: "",
    createProduct: "",
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
    createProduct,
    redirectToProfile,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  useEffect(() => {
    setValues({ ...values, formData: new FormData() }); //ademas de actualizarse, pobla la form data tambien que va hacia el backend para el nuevo producto
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
        console.log(data, "soy data")
      if (data.error) {
        console.log(data.error, "soy data error")
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

  return (
    <Layout
      title="Add a new Product"
      description={`Good day ${user.name}!, ready to add a new Product for today?`} //fluid, change the width of the graphic window
    >
      <div className="row">
        <div className="col-8 offset-md-2">
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
                <option value="6130064540b91a9e352c2b31">Python</option>
                <option value="6130064540b91a9e352c2b31">PHP</option>

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
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
