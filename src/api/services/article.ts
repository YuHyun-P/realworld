import { type Article } from "~/types";
import { auth } from "../base";

export type PaginationParams = {
  limit?: number;
  offset?: number;
};
export type ArticleListParams = PaginationParams & {
  tag?: string;
  author?: string;
  favorited?: boolean;
};

type CreateArticleRequest = Pick<
  Article,
  "title" | "description" | "body" | "tagList"
>;
type UpdateArticleRequest = Omit<CreateArticleRequest, "tagList">;

type ArticleListResponse = {
  articles: Article[];
  articlesCount: number;
};
type ArticleResponse = {
  article: Article;
};

const articleApi = {
  async getFollowFeedList(params: PaginationParams) {
    return await auth.get<ArticleListResponse>("/articles/feed", {
      params,
    });
  },
  async getList(params: ArticleListParams) {
    return await auth.get<ArticleListResponse>("/articles", {
      params,
    });
  },
  async create(payload: CreateArticleRequest) {
    return await auth.post<ArticleResponse>("/articles", {
      article: payload,
    });
  },
  async getDetail(slug: string) {
    return await auth.get<ArticleResponse>(`/articles/${slug}`);
  },
  async update(slug: string, payload: UpdateArticleRequest) {
    return await auth.put<ArticleResponse>(`/articles/${slug}`, {
      article: payload,
    });
  },
  async delete(slug: string) {
    return await auth.delete(`/articles/${slug}`);
  },
  async favorite(slug: string) {
    return await auth.post<ArticleResponse>(`/articles/${slug}/favorite`);
  },
  async unfavorite(slug: string) {
    return await auth.delete<ArticleResponse>(`/articles/${slug}/favorite`);
  },
};

export default articleApi;
