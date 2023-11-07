import React from "react";
import { Link, useLoaderData, Form, redirect } from "react-router-dom";
import { loginUser } from "../api.js";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("msg");
}

export async function action({ request }) {
  localStorage.setItem("isloggedin", false);
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = await loginUser({ email, password }).catch(() => {
    const response = redirect("/login");
    response.body = true;
    throw response;
  });
  if (data) {
    localStorage.setItem("isloggedin", true);
    const response = redirect("/host");
    response.body = true;
    throw response;
  }
  return null;
}

export default function Login() {
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const redirectMessage = useLoaderData();

  /*   function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    loginUser(loginFormData)
      .then((data) => console.log(data))
      .catch((err) => setError(err))
      .finally(() => setStatus("idle"));
  } */

  return (
    <div className="login">
      <h2>Sign in to your account</h2>
      (Email: b@b.com, Password: p123)
      {redirectMessage && (
        <h3 style={{ marginBottom: "6vw" }}>{redirectMessage}</h3>
      )}
      {error && <h3>{error.message}</h3>}
      <Form method="post" className="login-form" replace>
        <div className="login-form-inputs">
          <input
            className="login-form-input"
            type="email"
            name="email"
            placeholder="Email"
          />
          <hr />
          <input
            className="login-form-input"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Signing in..." : "Sign in"}
        </button>
      </Form>
      <p>
        Don't have an account?{" "}
        <Link to="/login" className="login-createAccount">
          Create one now
        </Link>
      </p>
    </div>
  );
}
