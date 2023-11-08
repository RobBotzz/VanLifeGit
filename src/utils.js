import { redirect } from "react-router-dom";

export async function requireAuth({ request }) {
  const isLoggedIn = localStorage.getItem("isloggedin");
  const pathname = new URL(request.url);

  if (isLoggedIn !== "true") {
    const response = redirect(
      `/login?msg=Login to access the host page&redirectTo=${pathname}`
    );
    response.body = true;
    throw response;
  }
  return null;
}
