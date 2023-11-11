// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore/lite";

// Your web app's Firebase configuration
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

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
