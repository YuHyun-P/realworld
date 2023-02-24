import { type MouseEventHandler, type ReactElement } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const DUMMY_USER = {
  email: "yy@yy",
  username: "yyy1",
  bio: null,
  image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
  token: "",
};

function Header(): ReactElement {
  const location = useLocation();

  const handleClickNewArticle: MouseEventHandler = (e): void => {
    const editorRegexp = /^\/editor(\/[^/]+)?$/i;
    if (editorRegexp.test(location.pathname)) {
      e.preventDefault();
    }
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          {DUMMY_USER === null ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Sign up
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/editor"
                  onClick={handleClickNewArticle}
                >
                  <i className="ion-compose" />
                  &nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/profile/${DUMMY_USER.username}`}
                >
                  <img className="user-pic" src={DUMMY_USER.image} alt="" />
                  {DUMMY_USER.username}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
