import { redirect } from "react-router-dom";
import { getAuth } from "firebase/auth";

export async function requireAuth(request) {
  const auth = getAuth();
  const user = auth.currentUser;
  const pathname = new URL(request.url);

  if (!user) {
    throw redirect(
      `/login?msg=Login to access the host page&redirectTo=${pathname}`
    );
  }
  return null;
}
