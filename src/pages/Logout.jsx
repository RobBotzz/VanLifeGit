import React from "react";
import {
  useLoaderData,
  useActionData,
  useNavigation,
  Link,
  Form,
} from "react-router-dom";

import { logoutUser } from "../api.js";

export async function loader() {
  try {
    await logoutUser();
  } catch (err) {
    return err.message;
  }

  return null;
}

export async function action() {
  try {
    await logoutUser();
  } catch (err) {
    return err.message;
  }
  return null;
}

export default function Logout() {
  const navigation = useNavigation();
  const loaderErrorMessage = useLoaderData();
  const actionErrorMessage = useActionData();
  const errorMessage = actionErrorMessage || loaderErrorMessage;

  return (
    <div className="logout">
      <h2 style={{ color: errorMessage ? "red" : "black" }}>
        {errorMessage ? "Could not logout user" : "Logged out successfully"}
      </h2>
      {errorMessage && <h3>{errorMessage}</h3>}

      {errorMessage && (
        <>
          <Form method="post" className="logout-form">
            <button>
              {navigation.state === "submitting"
                ? "Logging out..."
                : "Try again"}
            </button>
          </Form>
        </>
      )}
      <Link to="/home" className="logout-homelink">
        Back to Home
      </Link>
    </div>
  );
}
