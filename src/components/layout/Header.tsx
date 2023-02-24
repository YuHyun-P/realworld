import { type MouseEventHandler, type ReactElement } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "~/recoil/atoms/userState";

function Header(): ReactElement {
  const location = useLocation();
  const user = useRecoilValue(userAtom);

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
          {user === null ? (
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
                <NavLink className="nav-link" to={`/profile/${user.username}`}>
                  <img className="user-pic" src={user.image} alt="" />
                  {user.username}
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
