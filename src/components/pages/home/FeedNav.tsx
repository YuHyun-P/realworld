import { type ReactElement } from "react";
import { Link } from "react-router-dom";

interface FeedNavProps {
  current: string;
  onChange: (feed: string) => void;
}

function FeedNav({ current, onChange }: FeedNavProps): ReactElement {
  const handleChange = (feed: string): void => {
    onChange(feed);
  };
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link disabled"
            to="/"
            onClick={() => {
              handleChange("user");
            }}
          >
            Your Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/"
            onClick={() => {
              handleChange("global");
            }}
          >
            Global Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active"
            to="/"
            onClick={() => {
              handleChange("tag");
            }}
          >
            <i className="ion-pound" /> tag
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FeedNav;
