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

export function loader({ request, currentUser }) {
  //Redirect user to original destination or host route if already logged in
  if (currentUser) {
    const pathname =
      new URL(request.url).searchParams.get("redirectTo") || "/host";
    return redirect(pathname);
  }
  return new URL(request.url).searchParams.get("msg");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  try {
    await loginUser({ email, password });
    return redirect(pathname);
  } catch (err) {
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
        <Link to="/register" className="login-createAccount">
          Create one now
        </Link>
      </p>
    </div>
  );
}
