import { useReducer, useState, useCallback } from "react";
import { initialState, tagReducer } from "~/components/pages/editor/tagReducer";
import { type Tag } from "~/types";

type UseTagInputReturn = {
  tag: Tag;
  tagList: Tag[];
  handleChangeTag: (payload: Tag) => void;
  handleAddTag: (payload: Tag) => void;
  handleDeleteTag: (payload: Tag) => void;
};

function useTagInput(): UseTagInputReturn {
  const [tag, setTag] = useState("");
  const [tagList, dispatch] = useReducer(tagReducer, initialState);

  const handleChangeTag = useCallback((payload: Tag): void => {
    setTag(payload);
  }, []);

  const handleAddTag = useCallback(
    (payload: Tag): void => {
      const trimmedTag = payload.trim();
      if (tagList.includes(trimmedTag)) {
        return;
      }

      dispatch({ type: "ADD", payload: trimmedTag });
    },
    [tagList]
  );
  const handleDeleteTag = useCallback((payload: Tag): void => {
    dispatch({ type: "DELETE", payload: payload.trim() });
  }, []);

  return { tag, tagList, handleChangeTag, handleAddTag, handleDeleteTag };
}

export default useTagInput;
