
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRbGN5hPlzYMUhy3wgLsney7GjqP_nEvc",
  authDomain: "e-yukta.firebaseapp.com",
  projectId: "e-yukta",
  storageBucket: "e-yukta.appspot.com",
  messagingSenderId: "883570863129",
  appId: "1:883570863129:web:ec3085734821a6ddae0e88",
  measurementId: "G-1JPTVQ4664"
};

// Initialize Firebase only if no apps exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
