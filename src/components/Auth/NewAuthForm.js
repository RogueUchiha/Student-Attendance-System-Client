import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import carterHall from "../../carterhall2.jpg";
import carterHall3 from "../../carterhall3.jpg";
import wvutechlogo from "../../wvutechlogo.png";
import AuthContext from "../../store/auth-context";
import NewHeader from "../Layout/NewHeader";
// import classes from "./AuthForm.module.css";

const NewAuthForm = () => {
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
    <div>
      {/* <Header /> */}
      {/* <p>Hello</p>
  <button className="btn">Hello daisyUI</button> */}
      {/* <Intro /> */}
      <div>
        <div
          className="hero h-screen"
          style={{
            // backgroundImage: `url(http://api.lorem.space/image/fashion?w=1000&h=800)`,
            backgroundImage: `url(${carterHall3})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60">
            {/* <div className="navbar bg-neutral text-neutral-content backdrop-filter backdrop-blur-lg bg-opacity-30 sticky top-0">
          <a href="#" className="btn btn-ghost normal-case text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="36"
              height="36"
              className="mr-3"
            >
              <path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z" />
            </svg>
            Golden Bears Attendance
          </a>
        </div> */}
            <NewHeader />
          </div>
          {/* <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                Welcome to Golden Bears Attendance!
              </h1>
              <p className="mb-5">
                Click the button below or the login button at the top of the
                page to login and record your class attendance
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div> */}
          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
              <form onSubmit={submitHandler}>
                <img src={wvutechlogo}></img>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input
                    type="username"
                    id="username"
                    placeholder="email"
                    required
                    ref={usernameInputRef}
                    className="input input-bordered"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    ref={passwordInputRef}
                    placeholder="password"
                    class="input input-bordered"
                  />
                  {/* <label class="label">
                  <a href="#" class="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
                </div>
                <div class="form-control mt-6">
                  <button class="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
          <div className="items-center grid-flow-col">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>Copyright Akers, Short, Cross © 2022 - All right reserved</p>
          </div>
          <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            {/* <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a> */}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NewAuthForm;
