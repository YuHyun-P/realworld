import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout(): ReactElement {
  return (
    <>
      <Header />
      <Outlet />
      <div>Footer</div>
    </>
  );
}

export default Layout;
