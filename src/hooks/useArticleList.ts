import { type Tag } from "~/types";
import { useCallback, useEffect, useState } from "react";
import useAsync, { type DataState } from "./useAsync";
import articleApi, {
  type ArticleListResponse,
  type ArticleListParams,
} from "../api/services/article";

type Query = {
  limit: number;
  page: number;
  tag: Tag;
};

type UseArticleListReturn<Data, Error = unknown> = DataState<Data, Error> & {
  query: Query;
  setTag: (tag: Tag) => Promise<void>;
  setPage: (page: number) => Promise<void>;
};

function useArticleList(
  initialState: Query
): UseArticleListReturn<ArticleListResponse> {
  const [query, setQuery] = useState(initialState);
  const { data, isLoading, error, setLoading, setData, setError } =
    useAsync<ArticleListResponse>();

  const fetchData = useCallback(
    async (curQuery: Query): Promise<void> => {
      const request =
        curQuery.tag === "user"
          ? articleApi.getFollowFeedList
          : articleApi.getList;

      setLoading();

      try {
        const params = convertQuery(curQuery);
        const response = await request(params);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    },
    [setLoading, setData, setError]
  );

  const setTag = async (tag: Tag): Promise<void> => {
    const nextQuery = { ...query, tag, page: initialState.page };
    setQuery(nextQuery);
    setData({ articles: [], articlesCount: 0 });
  };

  const setPage = async (page: number): Promise<void> => {
    const nextQuery = { ...query, page };
    setQuery(nextQuery);
  };

  useEffect(() => {
    fetchData(query).catch((err) => {
      console.error(err);
    });
  }, [fetchData, query]);

  return {
    data,
    isLoading,
    error,
    query,
    setTag,
    setPage,
  };
}

export default useArticleList;

function convertQuery(query: Query): ArticleListParams {
  const { limit, page, tag } = query;

  return {
    limit,
    offset: (page - 1) * limit,
    tag: tag === "user" || tag === "global" ? undefined : tag,
  };
}
