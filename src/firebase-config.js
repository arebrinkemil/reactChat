// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNKyj0xxVmaRrLU7MLLaerLQaD47XCRgg",
  authDomain: "reactchatapp-cfeab.firebaseapp.com",
  projectId: "reactchatapp-cfeab",
  storageBucket: "reactchatapp-cfeab.appspot.com",
  messagingSenderId: "82983748815",
  appId: "1:82983748815:web:e47b5fca9133e34c8563ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
