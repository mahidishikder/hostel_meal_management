import React, { createContext, useEffect, useState } from 'react'
import { app } from '../firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// Context তৈরি করছি
export const AuthContext = createContext(null);

// Firebase Auth instance
const auth = getAuth(app);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // ইউজার স্টেট
  const [loading, setLoading] = useState(true); // লোডিং স্টেট

  // নতুন ইউজার তৈরি করার ফাংশন
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // লগইন ফাংশন
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // লগআউট ফাংশন
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  }

  // ইউজার স্টেট চেঞ্জ মনিটর করার জন্য useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // ক্লিনআপ ফাংশন
    return () => unsubscribe();
  }, []);

  // যেসব ডাটা Context দিয়ে পাঠানো হবে
  const authInfo = {
    name : 'mahidi',
    user,
    loading,
    createUser,
    loginUser,
    logout
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;