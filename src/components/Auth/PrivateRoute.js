import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const PrivateRoute = ({ allowedRole }) => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  let role = null;

  if (isLoggedIn) {
    let userData = JSON.parse(localStorage.getItem("data"));
    role = userData.role;
    console.log(role);
  }

  console.log(allowedRole);
  console.log(isLoggedIn);

  return role === allowedRole ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRoute;
