import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";

function Layout(): ReactElement {
  return (
    <>
      <div>Header</div>
      <Outlet />
      <div>Footer</div>
    </>
  );
}

export default Layout;
