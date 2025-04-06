
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail
} from "firebase/auth";
import { auth, googleProvider, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<User>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void>;
  updateProfilePicture: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        console.log("User created successfully:", userCredential.user.uid);
        return userCredential.user;
      });
  }

  function login(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        console.log("User logged in successfully:", userCredential.user.uid);
        return userCredential.user;
      });
  }

  function logout(): Promise<void> {
    return signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
      });
  }

  function signInWithGoogle(): Promise<User> {
    console.log("Starting Google sign in process...");
    return signInWithPopup(auth, googleProvider)
      .then((result: UserCredential) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        
        console.log("User signed in with Google successfully:", result.user.uid);
        return result.user;
      })
      .catch((error) => {
        console.error("Google sign in error:", {
          code: error.code,
          message: error.message,
          email: error.customData?.email,
          credential: GoogleAuthProvider.credentialFromError(error)
        });
        throw error; // Re-throw to be handled by components
      });
  }

  async function updateUserProfile(data: { displayName?: string; photoURL?: string }): Promise<void> {
    if (!currentUser) throw new Error("No authenticated user found");
    
    try {
      await firebaseUpdateProfile(currentUser, data);
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  async function updateUserEmail(email: string): Promise<void> {
    if (!currentUser) throw new Error("No authenticated user found");
    
    try {
      await firebaseUpdateEmail(currentUser, email);
      console.log("User email updated successfully");
    } catch (error) {
      console.error("Error updating user email:", error);
      throw error;
    }
  }

  async function updateProfilePicture(file: File): Promise<string> {
    if (!currentUser) throw new Error("No authenticated user found");
    
    try {
      // Create a storage reference
      const storageRef = ref(storage, `profile_images/${currentUser.uid}/profile.jpg`);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Update the user profile with the new photo URL
      await firebaseUpdateProfile(currentUser, {
        photoURL: downloadURL
      });
      
      console.log("Profile picture updated successfully");
      return downloadURL;
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? "User logged in" : "User logged out");
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    signInWithGoogle,
    updateUserProfile,
    updateUserEmail,
    updateProfilePicture
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
