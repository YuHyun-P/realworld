import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { type Comment } from "~/types";
import { formatDate } from "~/utils/formater";
import DeleteButton from "./DeleteButton";

interface CommentItemProps {
  comment: Comment;
  onDelete: () => void;
}

function CommentItem({ comment, onDelete }: CommentItemProps): ReactElement {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt=""
          />
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link
          to={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{formatDate(comment.createdAt)}</span>
        <DeleteButton onDelete={onDelete} />
      </div>
    </div>
  );
}

export default CommentItem;
