import { type Profile } from "~/types";
import { auth } from "../base";

type ProfileResponse = { profile: Profile };

const profileApi = {
  async getProfile(username: string) {
    return await auth.get<ProfileResponse>(`/profiles/${username}`);
  },
  async follow(username: string) {
    return await auth.post<ProfileResponse>(`/profiles/${username}/follow`);
  },
  async unfollow(username: string) {
    return await auth.delete<ProfileResponse>(`/profiles/${username}/follow`);
  },
};

export default profileApi;
