import { Link } from "react-router-dom";
import { BsCheck2Square } from "react-icons/bs";

const NewHeader = () => {
  return (
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
              {/* <a className="btn btn-outline btn-secondary">Login</a> */}
              <Link to="/auth" className="btn btn-outline btn-secondary">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl no-animation">
          <BsCheck2Square className="mr-2" /> Golden Bears Attendance
        </Link>
      </div>
      {/* <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
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
            <ul className="p-2">
              <li>
                <a>Override</a>
              </li>
              <li>
                <a>Reports</a>
              </li>
            </ul>
          </li>
        </ul>
      </div> */}
      <div className="navbar-end hidden lg:flex">
        {/* <a className="btn btn-outline btn-secondary">Login</a> */}
        <Link to="/auth" className="btn btn-outline btn-secondary">
          Login
        </Link>
      </div>
    </div>
  );
};
export default NewHeader;
