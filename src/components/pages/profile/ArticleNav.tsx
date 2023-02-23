import { type ReactElement } from "react";
import { Link } from "react-router-dom";

interface ArticleNavProps {
  username: string;
}

function ArticleNav({ username }: ArticleNavProps): ReactElement {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className="nav-link active" to={`/profile/${username}`}>
            My Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/profile/${username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ArticleNav;
