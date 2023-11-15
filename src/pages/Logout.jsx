import React from "react";
import {
  useActionData,
  useNavigation,
  Link,
  Form,
  redirect,
} from "react-router-dom";

import { logoutUser } from "../api.js";

export function loader({ request, currentUser }) {
  console.log("Logout loader started");
  //Redirect user to original destination or home route if already logged out
  console.log(currentUser);
  if (!currentUser) {
    const pathname =
      new URL(request.url).searchParams.get("redirectTo") || "/home";
    return redirect(pathname);
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
  const errorMessage = useActionData();

  return (
    <div className="logout">
      <h2 style={{ color: errorMessage ? "red" : "black" }}>
        {errorMessage
          ? "Failed to log out user"
          : "Do you want to leave already?"}
      </h2>
      {errorMessage && <h3>{errorMessage}</h3>}

      {true && (
        <>
          <Form method="post" className="logout-form" replace>
            <button>
              {navigation.state === "submitting"
                ? "Logging out..."
                : errorMessage
                ? "Try again"
                : "Log out"}
            </button>
          </Form>
        </>
      )}
      <Link to="/home" className="logout-homelink">
        Return to Page
      </Link>
    </div>
  );
}
