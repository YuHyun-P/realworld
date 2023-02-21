import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "~/utils/formatter";

interface MetaProfileProps {
  username: string;
  image: string;
  createdAt: string;
}

function MetaProfile({
  username,
  image,
  createdAt,
}: MetaProfileProps): ReactElement {
  return (
    <>
      <Link to={`/profile/${username}`}>
        <img src={image} alt="" />{" "}
      </Link>
      <div className="info">
        <Link to={`/profile/${username}`} className="author">
          {username}
        </Link>
        <span className="date">{formatDate(createdAt)}</span>
      </div>
    </>
  );
}

export default MetaProfile;
