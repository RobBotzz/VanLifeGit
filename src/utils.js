import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("isloggedin");
  //const isLoggedIn = "true";
  const pathname = new URL(request.url);

  if (isLoggedIn !== "true") {
    throw redirect(
      `/login?msg=Login to access the host page&redirectTo=${pathname}`
    );
  }
  return null;
}
