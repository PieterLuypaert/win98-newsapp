import { useState } from "react";
import { AuthContext } from "./AuthContext";
import * as Storage from "../../../core/storage";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(Storage.getUser());

  const handleSetUser = (user) => {
    // save to storage
    Storage.saveUser(user);
    // save state
    setUser(user);
  };

  return <AuthContext.Provider value={{ user, setUser: handleSetUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;