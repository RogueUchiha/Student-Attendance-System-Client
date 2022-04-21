import { Link, Outlet } from "react-router-dom";
import { BsCheck2Square } from "react-icons/bs";
import AuthContext from "../../store/auth-context";

import { useContext } from "react";

const NewStudentHeader = () => {
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
      <div className="navbar bg-base-100 text-primary-content bg-primary">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact bg-primary dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                {/* <a>Item 1</a> */}
                <Link to="/student">Classes</Link>
              </li>
              <li tabIndex="0">
                <a className="justify-between">
                  Attendance
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-primary">
                  <li>
                    <Link to="/facultyreports">Reports</Link>
                  </li>
                </ul>
              </li>
              <li>
                {/* <a className="btn btn-outline btn-secondary">Login</a> */}
                <Link
                  to="/auth"
                  className="btn btn-outline btn-secondary"
                  onClick={logoutHandler}
                >
                  Log out
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/student"
            className="btn btn-ghost normal-case text-xl no-animation"
          >
            <BsCheck2Square className="mr-2" /> Golden Bears Attendance
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 bg-primary">
            <li>
              {/* <a>Item 1</a> */}
              <Link to="/student">Classes</Link>
            </li>
            <li tabIndex="0">
              <a>
                Attendance
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-primary">
                <li>
                  <Link to="/facultyreports">Reports</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden lg:flex">
          {/* <a className="btn btn-outline btn-secondary">Login</a> */}
          <Link
            to="/auth"
            className="btn btn-outline btn-secondary"
            onClick={logoutHandler}
          >
            Log out
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default NewStudentHeader;
