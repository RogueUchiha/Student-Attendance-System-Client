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
