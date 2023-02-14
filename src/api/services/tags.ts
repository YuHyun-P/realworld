import { type Tag } from "~/types";
import instance from "../base";

type TagListResponse = {
  tags: Tag[];
};

const tagApi = {
  async getList() {
    return await instance.get<TagListResponse>("/tags");
  },
};

export default tagApi;
