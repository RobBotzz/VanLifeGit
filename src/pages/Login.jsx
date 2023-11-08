import React from "react";
import {
  Link,
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api.js";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("msg");
}

export async function action({ request }) {
  localStorage.setItem("isloggedin", false);
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await loginUser({ email, password });
    const response = redirect("/host");
    response.body = true;
    console.log("Redirecting to host");
    localStorage.setItem("isloggedin", true);
    return response;
  } catch (err) {
    console.log("returning error:", err.message);
    return err.message;
  }
}

export default function Login() {
  const navigation = useNavigation();
  const redirectMessage = useLoaderData();
  const errorMessage = useActionData();

  const redFont = {
    color: "red",
  };

  return (
    <div className="login">
      <h2>Sign in to your account</h2>
      (Email: b@b.com, Password: p123)
      {(errorMessage && <h3 style={redFont}>{errorMessage}</h3>) ||
        (redirectMessage && <h3 style={redFont}>{redirectMessage}</h3>)}
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
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Signing in..." : "Sign in"}
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
