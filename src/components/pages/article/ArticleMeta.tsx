import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { type Article } from "~/types";
import { formatDate } from "~/utils/formater";
import FollowButton from "../../common/FollowButton";
import FavoriteButton from "../../common/FavoriteButton";

interface ArticleMetaProps {
  article: Article;
  onToggleFollow: (value: boolean) => void;
  onToggleFavorite: (value: boolean) => void;
}

function ArticleMeta({
  article,
  onToggleFollow,
  onToggleFavorite,
}: ArticleMetaProps): ReactElement {
  return (
    <div className="article-meta">
      <Link to={`/profile/${article.author.username}`}>
        <img src={article.author.image} alt="" />{" "}
      </Link>
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{formatDate(article.createdAt)}</span>
      </div>
      <FollowButton
        defaultValue={article.author.following}
        username={article.author.username}
        onToggleFollow={onToggleFollow}
      />
      &nbsp;
      <FavoriteButton
        slug={article.slug}
        defaultValue={article.favorited}
        defaultCount={article.favoritesCount}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}

export default ArticleMeta;
