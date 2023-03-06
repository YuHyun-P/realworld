import { type Comment, type Article } from "~/types";
import { auth } from "../base";

type CreateCommentRequest = Pick<Comment, "body">;

type CommentListResponse = {
  articles: Article[];
};

const commentApi = {
  async getList(slug: string) {
    return await auth.get<CommentListResponse>(`/articles/${slug}/comments`);
  },
  async create(slug: string, payload: CreateCommentRequest) {
    return await auth.post<CommentListResponse>(`/articles/${slug}/comments`, {
      comment: payload,
    });
  },
  async delete(slug: string, id: number) {
    return await auth.delete(`/articles/${slug}/comments/${id}`);
  },
};

export default commentApi;
