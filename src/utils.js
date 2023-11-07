import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    const response = redirect("/login?msg=Login to access the host page");
    response.body = true;
    throw response;
  }
  return null;
}
