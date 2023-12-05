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
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

export async function getVans(id) {
  let querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);
  if (!vanSnapshot.data()) {
    console.log("Error thrown");
    const error = new Error("Could not load van data");
    error.body = true;
    throw error;
  }
  return {
    ...vanSnapshot.data(),
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
  return dataArr;
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
    console.log("logged out");
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

  let imageUrl = "";
  if (image) {
    const imageRef = ref(storage, `vanImages/${uuid()}`);
    await uploadBytes(imageRef, image).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((downloadURL) => {
        imageUrl = downloadURL;
      });
    });
  }
  addDoc(vansCollectionRef, {
    hostId: hostId,
    imageUrl: imageUrl,
    name: name,
    price: Number(price),
    type: type,
    description: description,
    isPublic: isPublic === "on",
  });
}

export async function deleteVan() {}
