import { type KeyboardEventHandler, type ReactElement } from "react";
import { type Tag } from "~/types";

interface TagListProps {
  tagList: Tag[];
  onClick: (tag: Tag) => void;
}

function TagList({ tagList, onClick }: TagListProps): ReactElement {
  const handleKeyDownWrapper =
    (tag: Tag): KeyboardEventHandler =>
    (e) => {
      if (e.key !== "Enter") {
        return;
      }

      onClick(tag);
    };

  const handleClickWrapper = (tag: Tag) => () => {
    onClick(tag);
  };

  return (
    <div className="tag-list">
      {tagList.map((tag) => (
        <span key={tag} className="tag-default tag-pill">
          <i
            className="ion-close-round"
            onClick={handleClickWrapper(tag)}
            onKeyDown={handleKeyDownWrapper(tag)}
            tabIndex={0}
            role="button"
            aria-label="delete tag"
          />
          {tag}
        </span>
      ))}
    </div>
  );
}

export default TagList;
