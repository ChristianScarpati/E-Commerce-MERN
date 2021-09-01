import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from '../auth/index'


const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (e) => {
    //name puede ser naime, email, password, etc.

    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const { name, email, password, success, error } = values;


  const clickSubmit = (e) => {
    e.preventDefault(); //no se reincia el navegador.
    signup({ name, email, password }).then((data) => {
      setValues({...values, error: false})
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
          
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSucces = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    > 
      New account is created. Please <Link to ="/signin">SignIn</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      <form>


      {showSucces()}
     {showError()}
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("name")}
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">email</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChange("email")}
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={password}
          />
        </div>

        <button className="btn btn-primary" onClick={clickSubmit}>
          Submit
        </button>
      </form>

   {/*    {JSON.stringify(values)} */}
     
     

    </Layout>
  );
};

export default Signup;
