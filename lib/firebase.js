// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore}from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA7h6XCKXchi487SSYKtjHiFpDLGH4OQnQ",
  authDomain: "present-ca876.firebaseapp.com",
  projectId: "present-ca876",
  storageBucket: "present-ca876.appspot.com",
  messagingSenderId: "748875956713",
  appId: "1:748875956713:web:6ea358e47d51033f794b78",
  measurementId: "G-VWV0F7EDD2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};