import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const FacultyHeader = (props) => {
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
        <Link to="/faculty">
          <div className={classes.logo}>Golden Bears Attendance</div>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/facultyreports">Attendance Reports</Link>
            </li>
            <li>
              <Link to="/faculty">Classes</Link>
            </li>
            <li>
              <Link to="/override">Override Attendance</Link>
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

export default FacultyHeader;
