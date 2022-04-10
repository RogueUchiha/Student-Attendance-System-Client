import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import MainNavigation from "./MainNavigation";

const Layout = () => {
  return (
    <Fragment>
      <MainNavigation />
      {/* <main>{props.children}</main> */}
      <Outlet />
    </Fragment>
  );
};

export default Layout;
