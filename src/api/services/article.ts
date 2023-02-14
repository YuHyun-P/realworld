import { type Article } from "~/types";
import instance from "../base";

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
  async getRecentList(params: PaginationParams) {
    return await instance.get<ArticleListResponse>("/articles/feed", {
      params,
    });
  },
  async getList(params: ArticleListParams) {
    return await instance.get<ArticleListResponse>("/articles/feed", {
      params,
    });
  },
  async create(payload: CreateArticleRequest) {
    return await instance.post<ArticleResponse>("/articles", {
      article: payload,
    });
  },
  async getDetail(slug: string) {
    return await instance.get<ArticleResponse>(`/articles/${slug}`);
  },
  async update(slug: string, payload: UpdateArticleRequest) {
    return await instance.put<ArticleResponse>(`/articles/${slug}`, {
      article: payload,
    });
  },
  async delete(slug: string) {
    return await instance.delete(`/articles/${slug}`);
  },
  async favorite(slug: string) {
    return await instance.post<ArticleListResponse>(
      `/articles/${slug}/favorite`
    );
  },
  async unfavorite(slug: string) {
    return await instance.delete<ArticleListResponse>(
      `/articles/${slug}/favorite`
    );
  },
};

export default articleApi;
