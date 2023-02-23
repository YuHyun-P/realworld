import { type ReactElement } from "react";
import { type Tag } from "~/types";

interface PreviewTagListProps {
  tagList: Tag[];
}

function PreviewTagList({ tagList }: PreviewTagListProps): ReactElement {
  return (
    <ul className="tag-list">
      {tagList.map((tag) => (
        <li className="tag-default tag-pill tag-outline" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default PreviewTagList;
