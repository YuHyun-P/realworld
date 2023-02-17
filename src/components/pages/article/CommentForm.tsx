import { type FormEventHandler, type ReactElement } from "react";

interface CommentFormProps {
  image: string;
  onSubmit: (body: string) => void;
}

function CommentForm({ image, onSubmit }: CommentFormProps): ReactElement {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(e.currentTarget.body.value);
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
          name="body"
        />
      </div>
      <div className="card-footer">
        <img src={image} className="comment-author-img" alt="" />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
