import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "admin1@gmail.com",
    password: "admin1",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const handleChange = (name) => (e) => {
    //name puede ser naime, email, password, etc.

    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const { email, password, loading, error, redirectToReferrer } = values;
  const {user} = isAuthenticated()


  const clickSubmit = (e) => {
    e.preventDefault();

    signin({ email, password }).then((data) => {
      setValues({ ...values, error: false, loading: true });
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const RedirectUser = () => {
    if (redirectToReferrer) {
      if(user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to ="/user/dashboard" />
      }
    }
};

  return (
    <Layout
      title="Signin"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      <form>
        {showLoading()}
        {showError()}
        {RedirectUser()}

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

export default Signin;
