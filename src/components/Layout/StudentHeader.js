import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const StudentHeader = (props) => {
  const authCtx = useContext(AuthContext);

  // let role = null;

  // if (isLoggedIn) {
  //   let userData = JSON.parse(localStorage.getItem("data"));
  //   role = userData.role;
  //   console.log(role);
  // }

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <div>
      <header className={classes.header}>
        <Link to="/student">
          <div className={classes.logo}>Golden Bears Attendance</div>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/reports">Attendance Reports</Link>
            </li>
            <li>
              <Link to="/student">Classes</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default StudentHeader;
