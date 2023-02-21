import { type ReactElement } from "react";
import { type Comment } from "~/types";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
  onDelete: (id: number) => void;
}

function CommentList({ comments, onDelete }: CommentListProps): ReactElement {
  const handleDeleteWrapper = (id: number) => (): void => {
    onDelete(id);
  };

  return (
    <>
      {comments.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          onDelete={handleDeleteWrapper(comment.id)}
        />
      ))}
    </>
  );
}

export default CommentList;
