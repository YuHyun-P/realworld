import { type ReactElement } from "react";
import { useParams } from "react-router-dom";

function Article(): ReactElement {
  const { articleSlug } = useParams();
  return (
    <>
      <div>Article</div>
      <div>{articleSlug}</div>
    </>
  );
}

export default Article;
