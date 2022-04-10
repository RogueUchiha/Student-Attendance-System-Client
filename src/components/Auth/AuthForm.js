import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    Axios.post("http://localhost:5000/login", {
      username: enteredUsername,
      password: enteredPassword,
    }).then((response) => {
      console.log(response);
      if (response.data.error) {
        alert("Wrong credentials");
        console.log("Wrong credentials");
      } else {
        const today = new Date();
        today.setDate(27);
        authCtx.login(
          response.data.AccessToken,
          today.toISOString(),
          response.data.UserData
        );
        console.log("hello");
        // navigate("/student");
        // navigate("/student");
        const role = response.data.UserData.role;
        // console.log(role);
        if (role === "Student") {
          navigate("/student");
        } else if (role === "Faculty") {
          navigate("/faculty");
        } else if (role === "Admin") {
          navigate("/admin");
        }
      }
    });

    // const checkCreds = () => {
    //   if (enteredUsername !== "Admin" || enteredPassword !== "password") {
    //     throw new Error("Invalid Credentials");
    //   }
    // };

    // try {
    //   checkCreds();
    //   const today = new Date();
    //   today.setDate(30);
    //   authCtx.login(
    //     "jkfda93opjifea83pidjiopf38qildaff8o34qp",
    //     today.toISOString()
    //   );
    //   // history.replace("/");
    //   navigate("/");
    // } catch (e) {
    //   console.log(e);
    //   alert("Invalid Credentials");
    // }

    // optional: Add validation

    // setIsLoading(true);
    // let url;
    // if (isLogin) {
    //   url =
    //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24";
    // }
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: enteredUsername,
    //     password: enteredPassword,
    //     returnSecureToken: true,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     setIsLoading(false);
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then((data) => {
    //         let errorMessage = "Authentication failed!";
    //         // if (data && data.error && data.error.message) {
    //         //   errorMessage = data.error.message;
    //         // }

    //         throw new Error(errorMessage);
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     const expirationTime = new Date(
    //       new Date().getTime() + +data.expiresIn * 1000
    //     );
    //     authCtx.login(data.idToken, expirationTime.toISOString());
    //     history.replace("/");
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input
            type="username"
            id="username"
            required
            ref={usernameInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
