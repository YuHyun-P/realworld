import { type KeyboardEventHandler, type ReactElement } from "react";

interface DeleteButtonProps {
  onDelete: () => void;
}

function DeleteButton({ onDelete }: DeleteButtonProps): ReactElement {
  const handleKeyDown: KeyboardEventHandler<HTMLSpanElement> = (e) => {
    if (e.key === "Enter") {
      onDelete();
    }
  };

  return (
    <span
      className="mod-options"
      onClick={onDelete}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="delete comment"
    >
      <i className="ion-trash-a" />
    </span>
  );
}

export default DeleteButton;
