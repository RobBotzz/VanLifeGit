import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = localStorage.getItem("isloggedin");

  if (isLoggedIn !== "true") {
    const response = redirect("/login?msg=Login to access the host page");
    response.body = true;
    throw response;
  }
  return null;
}
