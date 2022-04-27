import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

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
      <Link to="/">
        <div className={classes.logo}>Golden Bears Attendance</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/student">Classes</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );

  // if (isLoggedIn) {
  //   if (role === "Student") {
  //     return (
  //       <header className={classes.header}>
  //         <Link to="/student">
  //           <div className={classes.logo}>Golden Bears Attendance</div>
  //         </Link>
  //         <nav>
  //           <ul>
  //             <li>
  //               <Link to="/student">Classes</Link>
  //             </li>
  //             <li>
  //               <Link to="/attendance">Attendance Reports</Link>
  //             </li>
  //             <li>
  //               <button onClick={logoutHandler}>Logout</button>
  //             </li>
  //           </ul>
  //         </nav>
  //       </header>
  //     );
  //   } else if (role === "Faculty") {
  //     return (
  //       <header className={classes.header}>
  //         <Link to="/faculty">
  //           <div className={classes.logo}>Golden Bears Attendance</div>
  //         </Link>
  //         <nav>
  //           <ul>
  //             <li>
  //               <Link to="/faculty">Classes</Link>
  //             </li>
  //             <li>
  //               <Link to="/attendance">Attendance Reports</Link>
  //             </li>
  //             <li>
  //               <button onClick={logoutHandler}>Logout</button>
  //             </li>
  //           </ul>
  //         </nav>
  //       </header>
  //     );
  //   }
  // }
  // return (
  //   <header className={classes.header}>
  //     <Link to="/">
  //       <div className={classes.logo}>Golden Bears Attendance</div>
  //     </Link>
  //     <nav>
  //       <ul>
  //         <li>
  //           <Link to="/auth">Login</Link>
  //         </li>
  //       </ul>
  //     </nav>
  //   </header>
  // );
};

export default MainNavigation;
