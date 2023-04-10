// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbYvnYMFSmY1pnQw0XcoPaF2YAAon0fi8",
  authDomain: "puredating-unvaxxed.firebaseapp.com",
  projectId: "puredating-unvaxxed",
  storageBucket: "puredating-unvaxxed.appspot.com",
  messagingSenderId: "926900691816",
  appId: "1:926900691816:web:faca030bbb9e7b2371ecdd",
  measurementId: "G-VSYNBBXTLC"
};

// Initialize Firebase
const createFirebaseApp = (config = {}) => {
  try {
    return getApp();
  } catch {
    return  initializeApp(firebaseConfig);
  }
};
const firebaseApp = createFirebaseApp(firebaseConfig)

const auth = getAuth();
const db = getFirestore();
console.log('authauthasdsad',auth);
export {auth,db}