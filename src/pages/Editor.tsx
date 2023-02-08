import { type ReactElement } from "react";
import { useParams } from "react-router-dom";

function Editor(): ReactElement {
  const { articleSlug } = useParams();
  return (
    <>
      <div>Editor</div>
      <div>{articleSlug}</div>
    </>
  );
}

export default Editor;
