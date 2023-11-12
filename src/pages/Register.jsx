import React from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
/* import { registerUser } from "../api.js";
 */
export async function action({ request }) {
  /* const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword"); */

  try {
    //registerUser({ firstName, lastName, email, password, confirmPassword });
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
    <div className="register">
      <h2>Register a new account</h2>
      {errorMessage && <h3 style={redFont}>{errorMessage}</h3>}
      <Form method="post" className="register-form" replace>
        <div className="register-row">
          <div className="register-inputElement">
            <p className="register-inputName">First Name</p>
            <input type="text" className="register-inputField" />
          </div>
          <div className="register-inputElement">
            <p className="register-inputName">Last Name</p>
            <input type="text" className="register-inputField" />
          </div>
        </div>
        <div className="register-row">
          <div className="register-inputElement">
            <p className="register-inputName">Email</p>
            <input type="email" className="register-inputField" />
          </div>
        </div>
        <div className="register-row">
          <div className="register-inputElement">
            <p className="register-inputName">Password</p>
            <input type="password" className="register-inputField" />
          </div>
        </div>
        <div className="register-row">
          <div className="register-inputElement">
            <p className="register-inputName">Confirmation Password</p>
            <input type="password" className="register-inputField" />
          </div>
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
