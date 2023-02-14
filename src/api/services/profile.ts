import { type Profile } from "~/types";
import instance from "../base";

type ProfileResponse = { profile: Profile };

const profileApi = {
  async getProfile(username: string) {
    return await instance.get<ProfileResponse>(`/profiles/${username}`);
  },
  async follow(username: string) {
    return await instance.post<ProfileResponse>(`/profiles/${username}/follow`);
  },
  async unfollow(username: string) {
    return await instance.delete<ProfileResponse>(
      `/profiles/${username}/follow`
    );
  },
};

export default profileApi;
