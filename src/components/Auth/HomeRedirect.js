import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const HomeRedirect = () => {
  const authCtx = useContext(AuthContext);
  const [role, setRole] = useState(null);

  const isLoggedIn = authCtx.isLoggedIn;

  //   let role = null;

  if (isLoggedIn && role === null) {
    //   let userData = JSON.parse(localStorage.getItem("data"));
    //   setRole(userData.role)
    //   console.log(userData);
    setTimeout(() => {
      let userData = JSON.parse(localStorage.getItem("data"));
      console.log(`role is ${userData.role}`);
      setRole(userData.role);
      //   return role;
    });
    // let userData = JSON.parse(localStorage.getItem("data"));
    // console.log(`role is ${userData.role}`);
    // setRole(userData.role);
  }

  //   const checkRole = () => {
  //     let userData = null;
  //     setTimeout(() => {
  //       userData = JSON.parse(localStorage.getItem("data"));
  //       console.log(`role is ${userData}`);
  //       setRole(userData.role);
  //       return role;
  //     }, 2000);
  //   };

  console.log(isLoggedIn);

  //   return !isLoggedIn ? (
  //     <Outlet />
  //   ) : isLoggedIn ? (
  //     <Navigate to="/student" />
  //   ) : (
  //     <Navigate to="/auth" />
  //   );
  // };

  return !isLoggedIn ? (
    <Outlet />
  ) : (
    (() => {
      //   if (role === null) {
      //     return <h1>Loading...</h1>;
      //   }
      switch (role) {
        case "Student":
          console.log(role);
          return <Navigate to="/student" />;
        //   break;
        case "Faculty":
          console.log(role);
          return <Navigate to="/faculty" />;
        //   break;
        case "Admin":
          console.log(role);
          return <Navigate to="/admin" />;
        //   break;
        default:
          return <h1>Loading...</h1>;
      }
    })()
  );
};

export default HomeRedirect;
