import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { type Article } from "~/types";
import FollowButton from "../../common/FollowButton";
import FavoriteButton from "../../common/FavoriteButton";

interface ArticleMetaProps {
  article: Article;
}

function ArticleMeta({ article }: ArticleMetaProps): ReactElement {
  return (
    <div className="article-meta">
      <Link to={`/profile/${article.author.username}`}>
        <img src={article.author.image} alt="" />{" "}
      </Link>
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{article.createdAt}</span>
      </div>
      <FollowButton
        defaultValue={article.author.following}
        username={article.author.username}
      />
      &nbsp;
      <FavoriteButton
        slug={article.slug}
        defaultValue={article.favorited}
        defaultCount={article.favoritesCount}
      />
    </div>
  );
}

export default ArticleMeta;
