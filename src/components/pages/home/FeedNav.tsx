import { type ReactElement } from "react";
import { Link } from "react-router-dom";

interface FeedNavProps {
  current: string;
  onChange: (feed: string) => void;
}

function FeedNav({ current, onChange }: FeedNavProps): ReactElement {
  const handleChangeWrapper = (feed: string) => (): void => {
    onChange(feed);
  };
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link disabled"
            to="/"
            onClick={handleChangeWrapper("user")}
          >
            Your Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/"
            onClick={handleChangeWrapper("global")}
          >
            Global Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active"
            to="/"
            onClick={handleChangeWrapper("tag")}
          >
            <i className="ion-pound" /> tag
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FeedNav;
