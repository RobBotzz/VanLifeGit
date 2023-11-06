import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleFormChange(event) {
    setLoginFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(loginFormData);
  }

  return (
    <div className="login">
      <h2>Sign in to your account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="login-form-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleFormChange}
          value={loginFormData.email}
        />
        <hr />
        <input
          className="login-form-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleFormChange}
          value={loginFormData.password}
        />
      </form>
      <button onClick={handleSubmit}>Sign in</button>
      <p>
        Don't have an account?{" "}
        <Link to="/login" className="login-createAccount">
          Create one now
        </Link>
      </p>
    </div>
  );
}
