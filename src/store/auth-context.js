import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  // userData: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("data");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

// const retrieveUserData = () => {
//   const userData = JSON.parse(localStorage.getItem("data"));

//   return {
//     userData,
//   };
// };

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  // const userData = retrieveUserData();
  // const navigate = useNavigate();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  // let initialData;
  // if (userData) {
  //   initialData = userData;
  // }

  // const [data, setData] = useState(initialData);

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  // const logoutHandler = useCallback(() => {
  //   setToken(null);
  //   // const navigate = useNavigate();
  //   // setData(null);
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("expirationTime");
  //   localStorage.removeItem("data");

  //   if (logoutTimer) {
  //     clearTimeout(logoutTimer);
  //   }
  //   navigate("/");
  // }, []);

  const logoutHandler = () => {
    setToken(null);
    // const navigate = useNavigate();
    // setData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("data");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    // navigate("/");
  };

  const loginHandler = (token, expirationTime, userData) => {
    setToken(token);
    // setData(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("data", JSON.stringify(userData));

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  // useEffect(() => {
  //   if (tokenData) {
  //     console.log(tokenData.duration);
  //     logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  //   }
  // }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    // data: data,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
