import {
  type ReactElement,
  type KeyboardEventHandler,
  type ChangeEventHandler,
} from "react";
import { type Tag } from "~/types";
import TagList from "./TagList";

interface TagsProps {
  placeholder: string;
  name: string;
  tag: Tag;
  tagList: Tag[];
  onAdd: (payload: Tag) => void;
  onDelete: (payload: Tag) => void;
  onChange: (payload: Tag) => void;
}

function Tags({
  placeholder,
  name,
  tag,
  tagList,
  onAdd,
  onDelete,
  onChange,
}: TagsProps): ReactElement {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.currentTarget.value);
  };
  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e): void => {
    if (e.key !== "Enter") {
      return;
    }

    onAdd(e.currentTarget.value);
    onChange("");
  };
  const handleDelete = (payload: Tag): void => {
    onDelete(payload);
  };

  return (
    <fieldset className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        name={name}
        onKeyDown={handleEnter}
        value={tag}
        onChange={handleChange}
      />
      <TagList tagList={tagList} onClick={handleDelete} />
    </fieldset>
  );
}

export default Tags;
