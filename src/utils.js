import { redirect } from "react-router-dom";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export async function requireAuth(request, currentUser) {
  const pathname = new URL(request.url);
  if (currentUser === null) {
    throw redirect(
      `/login?msg=Login to access the host page&redirectTo=${pathname}`
    );
  }
  return null;
}

//Checks if van exist and currentUser has permission to access (Returns vanSnapshot)
export async function checkVanExistsAndPermission(vanId, currentUser) {
  //Check if van belongs to logged in user
  const db = getFirestore();
  const docRef = doc(db, "vans", vanId);
  const vanSnapshot = await getDoc(docRef);
  //TODO more specific error handling?
  if (!vanSnapshot.exists()) {
    throw new Error("The van you are looking for does not exist");
  }
  if (!vanSnapshot.data()) {
    throw new Error("Could not load van data");
  }
  if (vanSnapshot.data().hostId !== currentUser.uid) {
    throw new Error(
      "You do not have permission to access this van with this account"
    );
  }

  return vanSnapshot;
}

//Fetches all images of van and returns full object
export async function getVanObjectWithImages(vanSnapshot) {
  const storage = getStorage();

  //Fetch Image URLs
  const pathRef = ref(storage, `vanImages/${vanSnapshot.id}`);
  const imageUrls = await listAll(pathRef)
    .then((res) => {
      const urlPromises = res.items.map((itemRef) => {
        return getDownloadURL(itemRef);
      });
      return Promise.all(urlPromises);
    })
    .then((urls) => {
      // Now, urls is an array of resolved download URLs
      return urls;
    })
    .catch(() => {
      return [];
    });
  //Return van object data with image URLs
  return {
    ...vanSnapshot.data(),
    imageUrls: imageUrls,
    id: vanSnapshot.id,
  };
}
