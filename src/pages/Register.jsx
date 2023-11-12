import React from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { registerUser } from "../api.js";

export async function action({ request }) {
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  try {
    registerUser({ firstName, lastName, email, password, confirmPassword });
  } catch (err) {
    //Handle error messages
    return "Not implemented";
  }
  //Redirect to host page
  return null;
}

export default function Register() {
  const navigation = useNavigation();
  const errorMessage = useActionData();

  const redFont = {
    color: "red",
  };

  return (
    <div className="login">
      <h2>Register a new account</h2>
      {errorMessage && <h3 style={redFont}>{errorMessage}</h3>}
      <Form method="post" className="login-form" replace>
        <div className="login-form-inputs">
          <div className="container">
            <input
              className="login-form-input"
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <input
              className="login-form-input"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
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
          <input
            className="login-form-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Signing up..." : "Sign up"}
        </button>
      </Form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="login-createAccount">
          Login
        </Link>
      </p>
    </div>
  );
}
