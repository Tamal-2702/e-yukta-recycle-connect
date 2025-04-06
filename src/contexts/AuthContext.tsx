
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<User>;
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
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
