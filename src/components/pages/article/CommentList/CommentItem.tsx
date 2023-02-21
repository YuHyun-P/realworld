import { type ReactElement } from "react";
import { type Comment } from "~/types";
import DeleteButton from "./DeleteButton";
import CommentProfile from "./CommentProfile";

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
        <CommentProfile
          username={comment.author.username}
          image={comment.author.image}
          createdAt={comment.createdAt}
        />
        <DeleteButton onDelete={onDelete} />
      </div>
    </div>
  );
}

export default CommentItem;
