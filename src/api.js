// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
  query,
  where,
} from "firebase/firestore";

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

console.log("Authobject: ", JSON.stringify(auth));

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
    console.log("Error geschmissen");
    const error = new Error("Could not load van data");
    error.body = true;
    throw error;
  }
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", 123));
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
    (user) => {}
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
