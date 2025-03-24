import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

console.log(import.meta.env);
const firebaseConfig = {
  apiKey: "AIzaSyCONfMWJzmfP7Jqp7U7mIyynoJSGvsxkdw",
  authDomain: "auth-example-2d035.firebaseapp.com",
  projectId: "auth-example-2d035",
  storageBucket: "auth-example-2d035.appspot.com",
  messagingSenderId: "215616467281",
  appId: "1:215616467281:web:e9eed60d22e536137a6370",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
