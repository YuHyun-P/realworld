import { useState, type ReactElement } from "react";

interface FavoriteButtonProps {
  slug: string;
  defaultValue: boolean;
  defaultCount: number;
  compact?: boolean;
}

function FavoriteButton({
  slug,
  defaultValue,
  defaultCount,
  compact = false,
}: FavoriteButtonProps): ReactElement {
  const [favorite, setFavorite] = useState({
    isLoading: false,
    favorited: defaultValue,
    favoritesCount: defaultCount,
  });

  const handleClick = (): void => {
    // mock api
    setFavorite((prev) => ({
      ...prev,
      isLoading: true,
    }));

    setTimeout(() => {
      setFavorite((prev) => ({
        ...prev,
        isLoading: false,
        favorited: !prev.favorited,
        favoritesCount: prev.favorited
          ? prev.favoritesCount - 1
          : prev.favoritesCount + 1,
      }));
    }, 1000);
  };

  return (
    <button
      className={`btn btn-sm ${compact ? "pull-xs-right" : ""} ${
        favorite.favorited ? "btn-primary" : "btn-outline-primary"
      }`}
      type="button"
      onClick={handleClick}
      disabled={favorite.isLoading}
    >
      <i className="ion-heart" />{" "}
      {!compact && (
        <span>
          {favorite.favorited ? "Unfavorite Article" : "Favorite Article"}{" "}
        </span>
      )}
      {compact ? (
        favorite.favoritesCount
      ) : (
        <span className="counter">({favorite.favoritesCount})</span>
      )}
    </button>
  );
}

export default FavoriteButton;
