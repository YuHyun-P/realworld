import { type ReactElement } from "react";
import { Link } from "react-router-dom";

function Footer(): ReactElement {
  return (
    <footer>
      <div className="container">
        <Link to="/" className="logo-font">
          conduit
        </Link>
        <span className="attribution">
          An interactive learning project from{" "}
          <Link to="https://thinkster.io" target="_blank">
            Thinkster
          </Link>
          . Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
