import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Layout(): ReactElement {
  return (
    <>
      <div>Header</div>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
