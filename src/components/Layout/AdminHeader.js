import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const AdminHeader = () => {
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
    <header className={classes.header}>
      <Link to="/admin">
        <div className={classes.logo}>Golden Bears Attendance</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/admin">Database Management</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
