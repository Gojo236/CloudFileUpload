// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseProjectId = process.env.FIREBASE_APP_ID
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: firebaseProjectId+".firebaseapp.com",
  projectId: firebaseProjectId,
  storageBucket: firebaseProjectId+".appspot.com",
  messagingSenderId: "861788465291",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-72W1L6CHG3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);