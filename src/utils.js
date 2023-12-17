import { redirect } from "react-router-dom";
import { getDoc, getFirestore, doc } from "firebase/firestore";

export async function requireAuth(request, currentUser) {
  const pathname = new URL(request.url);

  if (!currentUser) {
    throw redirect(
      `/login?msg=Login to access the host page&redirectTo=${pathname}`
    );
  }
  return null;
}

export async function requireAuthVan(params, request, currentUser) {
  const pathname = new URL(request.url);

  //Check if user is logged in
  if (!currentUser) {
    throw redirect(
      `/login?msg=Login to access the van page&redirectTo=${pathname}`
    );
  }

  //Check if van belongs to logged in user
  const db = getFirestore();
  const docRef = doc(db, "vans", params.id);
  const vanSnapshot = await getDoc(docRef);
  if (!vanSnapshot.data()) {
    throw new Error("Could not load van data");
  }
  if (vanSnapshot.data().hostId !== currentUser.uid) {
    throw redirect("/no-permission");
  }

  return null;
}
