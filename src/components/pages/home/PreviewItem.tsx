import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { type Article } from "~/types";
import FavoriteButton from "~/components/common/FavoriteButton";
import PreviewTagList from "./PreviewTagList";

interface PreviewItemProps {
  article: Article;
}

function PreviewItem({ article }: PreviewItemProps): ReactElement {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img src={article.author.image} alt="" />
        </Link>
        <div className="info">
          <Link to={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{article.createdAt}</span>
        </div>
        <FavoriteButton
          compact
          slug={article.slug}
          defaultValue={article.favorited}
          defaultCount={article.favoritesCount}
        />
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <PreviewTagList tagList={article.tagList} />
      </Link>
    </div>
  );
}

export default PreviewItem;
