import { type ReactElement } from "react";
import { type Article } from "~/types";
import FollowButton from "~/components/common/FollowButton";
import FavoriteButton from "~/components/common/FavoriteButton";
import MetaProfile from "./MetaProfile";

interface ArticleMetaProps {
  article: Article;
  onToggleFollow: (value: boolean) => void;
  onToggleFavorite: (
    value: Pick<Article, "favorited" | "favoritesCount">
  ) => void;
}

function ArticleMeta({
  article,
  onToggleFollow,
  onToggleFavorite,
}: ArticleMetaProps): ReactElement {
  return (
    <div className="article-meta">
      <MetaProfile
        username={article.author.username}
        image={article.author.image}
        createdAt={article.createdAt}
      />
      <FollowButton
        defaultValue={article.author.following}
        username={article.author.username}
        onToggleFollow={onToggleFollow}
      />
      &nbsp;
      <FavoriteButton
        slug={article.slug}
        initialState={{
          favorited: article.favorited,
          favoritesCount: article.favoritesCount,
        }}
        onToggle={onToggleFavorite}
      />
    </div>
  );
}

export default ArticleMeta;
