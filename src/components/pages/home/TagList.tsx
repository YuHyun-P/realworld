import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { type Tag } from "~/types";

interface TagListProps {
  tagList: Tag[];
  onClick: (tag: string) => void;
}

function TagList({ tagList, onClick }: TagListProps): ReactElement {
  const handleClickWrapper = (tag: string) => (): void => {
    onClick(tag);
  };
  return (
    <div className="tag-list">
      {tagList.map((tag) => (
        <Link
          to="/"
          key={tag}
          className="tag-pill tag-default"
          onClick={handleClickWrapper(tag)}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

export default TagList;
