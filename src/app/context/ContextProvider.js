"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";

const ContextProvider = createContext();

export const DataProvider = ({ children }) => {
  const [sideBar, setSideBar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
            });
          } else {
            setCurrentUser(null);
          }
          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Auth persistence error:", error);
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <ContextProvider.Provider
      value={{ sideBar, setSideBar, currentUser, logout, loading }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export const useAccordion = () => useContext(ContextProvider);
