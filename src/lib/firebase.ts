import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firestoreConfig, storageConfig } from "./googleApiConfig";

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

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Cloud Storage
export const storage = getStorage(app);

// Set persistence to LOCAL to keep the user logged in
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

// Configure Google provider with improved configuration
export const googleProvider = new GoogleAuthProvider();

// Add scopes for Google authentication
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Set custom parameters - force prompt every time
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
