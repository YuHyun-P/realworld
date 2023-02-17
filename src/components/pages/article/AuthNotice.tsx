import { type ReactElement } from "react";
import { Link } from "react-router-dom";

function AuthNotice(): ReactElement {
  return (
    <p>
      <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link> to
      add comments on this article.
    </p>
  );
}

export default AuthNotice;
