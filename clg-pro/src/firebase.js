// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByFHkuS4jJwoFsEhCNSc3biGyJoSCP_C4",
  authDomain: "clg-pro-b460a.firebaseapp.com",
  projectId: "clg-pro-b460a",
  storageBucket: "clg-pro-b460a.firebasestorage.app",
  messagingSenderId: "532759842481",
  appId: "1:532759842481:web:a0ae7046d3f48e70485c90",
  measurementId: "G-VH3KL5CZRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Create a new Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Define the function for Google Sign-In
const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Define the logout function
const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Export the necessary services and functions
export { auth, db, signInWithGoogle, logout };
