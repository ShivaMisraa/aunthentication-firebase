import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

let LogoutTimer;

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token; // !! this will change this in boolean value like truthy or falsy value

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);

    const expirationTime = new Date().getTime() + 5 * 60 * 1000;
    localStorage.setItem("expirationTome", expirationTime);
    startLogoutTimer(expirationTime);
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    clearTimeout(LogoutTimer);
  };

  const startLogoutTimer = (expirationTime) => {
    const remainingTime = expirationTime - new Date().getTime();
    LogoutTimer = setTimeout(logOutHandler, remainingTime);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");
    const currentTime = new Date().getDate();

    if (storedToken && expirationTime && currentTime < expirationTime) {
      startLogoutTimer(expirationTime);
    } else {
      logOutHandler();
    }
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
