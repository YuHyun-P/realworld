import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useFavorite from "~/hooks/useFavorite";
import userAtom from "~/recoil/atoms/userState";
import { type Article } from "~/types";

interface FavoriteButtonProps {
  slug: string;
  initialState: Pick<Article, "favorited" | "favoritesCount">;
  compact?: boolean;
  onToggle?: (value: Pick<Article, "favorited" | "favoritesCount">) => void;
}

function FavoriteButton({
  slug,
  initialState,
  compact = false,
  onToggle,
}: FavoriteButtonProps): ReactElement {
  const user = useRecoilValue(userAtom);
  const {
    data,
    isLoading,
    handleClick: onClick,
  } = useFavorite(slug, initialState, onToggle);
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (user === null) {
      navigate("/login");
      return;
    }

    onClick();
  };

  return (
    <button
      className={`btn btn-sm ${compact ? "pull-xs-right" : ""} ${
        data.favorited ? "btn-primary" : "btn-outline-primary"
      }`}
      type="button"
      onClick={handleClick}
      disabled={isLoading}
    >
      <i className="ion-heart" />{" "}
      {!compact && (
        <span>
          {data.favorited ? "Unfavorite Article" : "Favorite Article"}{" "}
        </span>
      )}
      {compact ? (
        data.favoritesCount
      ) : (
        <span className="counter">({data.favoritesCount})</span>
      )}
    </button>
  );
}

export default FavoriteButton;
