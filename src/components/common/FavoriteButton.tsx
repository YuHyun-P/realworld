import { type ReactElement } from "react";

interface FavoriteButtonProps {
  favorited: boolean;
  favoritesCount: number;
  compact?: boolean;
}

function FavoriteButton({
  favorited,
  favoritesCount,
  compact = false,
}: FavoriteButtonProps): ReactElement {
  // state로 관리 vs. props로 관리
  return (
    <button
      className={`btn btn-sm pull-xs-right ${
        favorited ? "btn-primary" : "btn-outline-primary"
      }`}
      type="button"
    >
      <i className="ion-heart" />{" "}
      {!compact && (
        <span>{favorited ? "Favorite Article" : "Unfavorite Article"} </span>
      )}
      {favoritesCount}
    </button>
  );
}

export default FavoriteButton;
