"use client";
import { useEffect } from "react";

const ClearLocalStorageButKeepAuth = () => {
  useEffect(() => {
    const allowedKeys = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("firebase:authUser:")) {
        allowedKeys.push(key);
      }
      if (key && key.startsWith("firebase:session")) {
        allowedKeys.push(key);
      }
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !allowedKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    }
  }, []);

  return null;
};

export default ClearLocalStorageButKeepAuth;
