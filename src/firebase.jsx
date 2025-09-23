// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbmOp7Ttilrl5nhxFvEQSxpwsHGZVTWxI",
  authDomain: "gradrent-97509.firebaseapp.com",
  projectId: "gradrent-97509",
  storageBucket: "gradrent-97509.appspot.com",  // corrected here
  messagingSenderId: "670934043949",
  appId: "1:670934043949:web:063d3583dba1d6f51c17a4",
  measurementId: "G-GNLWM7E0V8"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore and Auth services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };