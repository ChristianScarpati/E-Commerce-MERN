import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import createCategory from "./ApiAdmin";


const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //////// destructuring user and info from localstorage. Ausgezeichnet !
  const { user, token } = isAuthenticated();

 
    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        // Machen einen request zur Kategorie api
        createCategory(user._id, token, {name})
        .then(data => {
          if(data.error) {
            console.log(data.error, "soy data")
            setError(true) 
          } else {
            setError('')
            setSuccess(true)
          }
        })
    }

    const showSucces = () => {
      if(success) {
        return <h3 className="text-success">{name} is created</h3>
      }
    }

    const showError = () => {
      if(error) {
        return <h3 className="text-danger">{name} will should be unique</h3>
      }
    }

    const goBack = () => (
      <div className="mt-5 ">
        <Link to="/admin/dashboard" className="text-warning "><h5>Back to Dashboard</h5> </Link>
      </div>
    )

  return (
      
    <Layout
      title="Add a new Category"
      description={`Good day ${user.name}!, ready to add a new category?`}   //fluid, change the width of the graphic window
    >

      {showSucces()}
      {showError()}

    <div className="row">
        <div className="col-md-8 offset-md-2">
            <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control mb-4"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
        <button className="btn btn-outline-primary ">Create category</button>
      </div>
      {goBack()}

    </form>
        </div>
    </div>


    </Layout>
  );
};

export default AddCategory;
