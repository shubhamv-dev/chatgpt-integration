"use client"
import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  const [isAuthReady, setIsAuthReady] = useState(false); // New state variable
  //   defualt axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({ ...auth, user: parseData.user, token: parseData.token });
    } setIsAuthReady(true); // Set the flag to indicate that authentication data is ready
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <AuthContext.Provider value={[auth, setAuth]}>
        {isAuthReady ? children : null} {/* Render children only when authentication data is ready */}
      </AuthContext.Provider>
    </>
  );
};
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };