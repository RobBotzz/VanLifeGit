import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { loginUser } from "../api.js";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("msg");
}

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const redirectMessage = useLoaderData();

  function handleFormChange(event) {
    setLoginFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    loginUser(loginFormData)
      .then((data) => console.log(data))
      .catch((err) => setError(err))
      .finally(() => setStatus("idle"));
  }

  /**
   * 5. Add an `error` state and default it to `null`. When the
   *    form is submitted, reset the errors to `null`. If there's
   *    an error from `loginUser` (add a .catch(err => {...}) in
   *    the promise chain), set the error to the error that
   *    comes back.
   * 6. Display the error.message below the `h1` if there's ever
   *    an error in state
   */

  return (
    <div className="login">
      <h2>Sign in to your account</h2>
      {redirectMessage && <h3>{redirectMessage}</h3>}
      {error && <h3>{error.message}</h3>}
      <form className="login-form">
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
      <button disabled={status === "submitting"} onClick={handleSubmit}>
        {status === "submitting" ? "Signing in..." : "Sign in"}
      </button>
      <p>
        Don't have an account?{" "}
        <Link to="/login" className="login-createAccount">
          Create one now
        </Link>
      </p>
    </div>
  );
}
