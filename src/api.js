// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import uuid from "react-uuid";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCQfMYtoD4W0IVBjD5BNUy-7jYqW7mV_hY",
  authDomain: "vanlife-b4be5.firebaseapp.com",
  projectId: "vanlife-b4be5",
  storageBucket: "vanlife-b4be5.appspot.com",
  messagingSenderId: "130572332420",
  appId: "1:130572332420:web:208e383c975be93a23c1d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  //Fetch van object data
  let querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  //Fetch Image URLs
  const dataArrWithURLs = await Promise.all(
    dataArr.map(async (van) => {
      const pathRef = ref(storage, `vanImages/${van.id}`);
      try {
        const imageUrls = await listAll(pathRef)
          .then((res) => {
            const urlPromises = res.items.map((itemRef) => {
              return getDownloadURL(itemRef);
            });
            return Promise.all(urlPromises);
          })
          .catch((err) => {
            return [];
          });
        return {
          ...van,
          imageUrls: imageUrls,
        };
      } catch (error) {
        return {
          ...van,
          imageUrls: [], // or some default value
        };
      }
    })
  );
  return dataArrWithURLs;
}

export async function getVan(id) {
  //Fetch van object data
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);

  if (!vanSnapshot.exists()) {
    throw new Error("The van you are looking for does not exist");
  }

  //Fetch Image URLs
  const pathRef = ref(storage, `vanImages/${id}`);
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
    .catch((error) => {
      return [];
    });
  //Return van object data with image URLs
  return {
    ...vanSnapshot.data(),
    imageUrls: imageUrls,
    id: vanSnapshot.id,
  };
}

export async function getHostVans(currentUser) {
  const q = query(vansCollectionRef, where("hostId", "==", currentUser.uid));
  let querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  //Fetch Image URLs
  const dataArrWithURLs = await Promise.all(
    dataArr.map(async (van) => {
      const pathRef = ref(storage, `vanImages/${van.id}`);
      try {
        const imageUrls = await listAll(pathRef)
          .then((res) => {
            const urlPromises = res.items.map((itemRef) => {
              return getDownloadURL(itemRef);
            });
            return Promise.all(urlPromises);
          })
          .catch((err) => {
            return [];
          });
        return {
          ...van,
          imageUrls: imageUrls,
        };
      } catch (error) {
        console.error("Error fetching van URLs:", error);
        return {
          ...van,
          imageUrls: [], // or some default value
        };
      }
    })
  );
  return dataArrWithURLs;
}

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) {
  if (!firstName) throw new Error("First name must be provided");
  if (!lastName) throw new Error("Last name must be provided");
  if (!email) throw new Error("Email must be provided");
  if (!password) throw new Error("Password must be provided");
  if (!confirmPassword)
    throw new Error("Confirmation Password must be provided");
  if (password !== confirmPassword) throw new Error("Passwords do not match");

  await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      const newUserRef = doc(db, "users", user.uid);

      setDoc(newUserRef, {
        first_name: firstName,
        last_name: lastName,
        premium: false,
        creation_date: Timestamp.now(),
        income: 0,
        rating: null,
      });
    }
  );
}

export async function loginUser({ email, password }) {
  await signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      //
    }
  );
}

export async function logoutUser() {
  await signOut(auth).then(() => {
    //
  });
}

export async function getUserData(userId) {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function createVan(
  hostId,
  image,
  name,
  price,
  type,
  description,
  isPublic
) {
  /* SERVERSIDE
  -> HostId must equal the request's hostId
  -> Name.length >= 5
  -> Price >= 1
  -> Type in (Rugged, Simple, Luxury)
  -> Description.length >= 10 */

  if (!hostId) throw new Error("HostID is required");
  if (!name) throw new Error("Name is required");
  if (name.length < 5)
    throw new Error("Name must be at least 5 characters long");
  if (!price) throw new Error("Price is required");
  if (price < 1) throw new Error("Price must be a positive number");
  if (!type) throw new Error("Type is required");
  if (!description) throw new Error("Description is required");
  if (description.length < 10)
    throw new Error("Please enter a more detailed description");

  //BILD UND OBJEKT MUSS GEMEINSAM GELÖSCHT WERDEN
  // -> Objekt erst löschen nachdem unter Link kein Bild mehr existiert
  // -> Bild erst hochladen nachdem Objekt erstellt wurde
  // -> Bildlink von Objekt erst ändern nachdem vorheriges Bild gelöscht wurde

  //Create van object
  addDoc(vansCollectionRef, {
    hostId: hostId,
    name: name,
    price: Number(price),
    type: type,
    description: description,
    isPublic: isPublic === "on",
  }).then((docRef) => {
    //Check if image object is a valid image
    if (image.type.startsWith("image/") || image === null) {
      //Upload images of van
      const imageRef = ref(storage, `vanImages/${docRef.id}/${uuid()}`);
      uploadBytes(imageRef, image);
    }
  });
}

export async function deleteVan(vanId) {
  /* SERVERSIDE
    -> Only delete van object when all images were deleted
   */
  //Delete all images from route
  const imagesRef = ref(storage, `vanImages/${vanId}`);
  const images = await listAll(imagesRef);
  await Promise.all(images.items.map((item) => deleteObject(item)));

  //Check if images still exist
  const updatedItems = await listAll(imagesRef);
  if (updatedItems.items.length === 0) {
    deleteDoc(doc(db, "vans", vanId));
  }
}

export async function editVan(vanId, name, price, type, description, isPublic) {
  if (!name) throw new Error("Name is required");
  if (name.length < 5)
    throw new Error("Name must be at least 5 characters long");
  if (!price) throw new Error("Price is required");
  if (price < 1) throw new Error("Price must be a positive number");
  if (!type) throw new Error("Type is required");
  if (!description) throw new Error("Description is required");
  if (description.length < 10)
    throw new Error("Please enter a more detailed description");

  const vanRef = doc(vansCollectionRef, vanId);

  const snapshot = await getDoc(vanRef);
  if (snapshot.exists()) {
    setDoc(
      vanRef,
      {
        name: name,
        price: Number(price),
        type: type,
        description: description,
        isPublic: isPublic === "on",
      },
      { merge: true }
    );
  } else {
    throw new Error("Van does not exist");
  }
}
