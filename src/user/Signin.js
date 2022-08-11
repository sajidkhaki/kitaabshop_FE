import React, { useState } from "react";
import Layout from "../core/Layout";
import { SigninData, authenticate, isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    SigninData({ email: email, password: password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else if(data.err) {
        setValues({ ...values, error: data.err, loading: false });
      } else {
        console.log("***LoginResponse***", data)
        authenticate(data, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            error: "",
            loading: false,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Confirm identity
      </button>
    </form>
  );

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
      <div className="alert aler-info">
        <h2>Loading.....</h2>
      </div>
    );
  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else if (user && user.role === 0) {
        return <Redirect to="/user/dashboard" />;
      } else if (user && user.role === 2) {
        return <Redirect to="/support/dashboard" />;
      }
    }
  };

  if (isAuthenticated()) {
    // if already logged in redirect to homepage
    return <Redirect to="/" />;
  }
  return (
    <Layout
      title="Sign in"
      description="Sign in to place an order"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
