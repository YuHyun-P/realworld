import { type ReactElement } from "react";
import PreviewTagList from "~/components/common/PreviewList/PreviewTagList";
import { type Tag } from "~/types";

interface ContentProps {
  body: string;
  tagList: Tag[];
}

function Content({ body, tagList }: ContentProps): ReactElement {
  return (
    <div className="row article-content">
      <div className="col-md-12">
        <p>{body}</p>
        <PreviewTagList tagList={tagList} />
      </div>
    </div>
  );
}

export default Content;
