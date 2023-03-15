import { useCallback, useEffect } from "react";
import articleApi from "~/api/services/article";
import { type Article } from "~/types";
import useAsync from "./useAsync";

type State = Pick<Article, "favorited" | "favoritesCount">;

type OnToggle = (state: State) => void;

type UseFavoriteReturn = {
  data: State;
  isLoading: boolean;
  handleClick: () => void;
};

function useFavorite(
  slug: string,
  initialState: State,
  onToggle?: OnToggle
): UseFavoriteReturn {
  const {
    data = initialState,
    isLoading,
    setData,
    setLoading,
    setError,
  } = useAsync<State>();

  const fetchData = useCallback(
    async (curFavorited: boolean) => {
      const request = curFavorited
        ? articleApi.unfavorite
        : articleApi.favorite;

      setLoading();

      try {
        const response = await request(slug);
        const { favorited, favoritesCount } = response.data.article;
        setData({ favorited, favoritesCount });
        if (onToggle !== undefined) {
          onToggle({ favorited, favoritesCount });
        }
      } catch (error) {
        setError(error);
      }
    },
    [setLoading, setData, setError, slug, onToggle]
  );

  const handleClick = async (): Promise<void> => {
    await fetchData(data.favorited);
  };

  useEffect(() => {
    if (initialState === data) {
      return;
    }

    setData(initialState);
  }, [initialState]);

  return {
    data,
    isLoading,
    handleClick,
  };
}

export default useFavorite;
