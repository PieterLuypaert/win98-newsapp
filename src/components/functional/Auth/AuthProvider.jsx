import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import * as Storage from "../../../core/storage";

const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(Storage.getUser());

  const setUser = useCallback(
    (u) => {
      Storage.saveUser(u);
      setUserState(u);

     
      if (u) {
        try {
          Storage.clearBookmarks(null); 
        } catch {
        }
        try {
          
          Storage.saveBookmarks(u.id, []);
        } catch {
        }
      }
    },
    [setUserState]
  );

  // stable logout
  const logout = useCallback(() => {
    Storage.saveUser(null);
    setUserState(null);
  }, [setUserState]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "app_user") {
        try {
          const value = e.newValue ? JSON.parse(e.newValue) : null;
          setUserState(value);
        } catch {
          setUserState(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
