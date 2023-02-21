import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "~/utils/formatter";

interface CommentProfileProps {
  username: string;
  image: string;
  createdAt: string;
}

function CommentProfile({
  username,
  image,
  createdAt,
}: CommentProfileProps): ReactElement {
  return (
    <>
      <Link to={`/profile/${username}`} className="comment-author">
        <img src={image} className="comment-author-img" alt="" />
      </Link>
      &nbsp;&nbsp;&nbsp;
      <Link to={`/profile/${username}`} className="comment-author">
        {username}
      </Link>
      <span className="date-posted">{formatDate(createdAt)}</span>
    </>
  );
}

export default CommentProfile;
