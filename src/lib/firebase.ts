
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRbGN5hPlzYMUhy3wgLsney7GjqP_nEvc",
  authDomain: "e-yukta.firebaseapp.com",
  projectId: "e-yukta",
  storageBucket: "e-yukta.firebasestorage.app",
  messagingSenderId: "883570863129",
  appId: "1:883570863129:web:ec3085734821a6ddae0e88",
  measurementId: "G-1JPTVQ4664"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
