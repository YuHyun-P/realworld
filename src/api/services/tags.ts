import { type Tag } from "~/types";
import { unauth } from "../base";

type TagListResponse = {
  tags: Tag[];
};

const tagApi = {
  async getList() {
    return await unauth.get<TagListResponse>("/tags");
  },
};

export default tagApi;
