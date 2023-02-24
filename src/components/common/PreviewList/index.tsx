import { type ReactElement } from "react";
import { type Article } from "~/types";
import PreviewItem from "./PreviewItem";

interface PreviewListProps {
  articles: Article[];
}

function PreviewList({ articles }: PreviewListProps): ReactElement {
  return (
    <>
      {articles.map((article) => (
        <PreviewItem key={article.slug} article={article} />
      ))}
    </>
  );
}

export default PreviewList;
