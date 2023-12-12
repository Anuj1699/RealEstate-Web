// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-web-100f0.firebaseapp.com",
  projectId: "realestate-web-100f0",
  storageBucket: "realestate-web-100f0.appspot.com",
  messagingSenderId: "587219647543",
  appId: "1:587219647543:web:21345efc5cac8bb2af13b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);