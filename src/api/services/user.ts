import { type User } from "~/types";
import instance from "../base";

type LoginUserRequest = {
  email: string;
  password: string;
};
export type RegisterUserRequest = LoginUserRequest & {
  username: string;
};
type UpdateUserRequest = Partial<User>;
export type UserResponse = { user: User };

const userApi = {
  async login(payload: LoginUserRequest) {
    return await instance.post<UserResponse>("/users/login", { user: payload });
  },
  async register(payload: RegisterUserRequest) {
    return await instance.post<UserResponse>("/users", { user: payload });
  },
  async getUser() {
    return await instance.post<UserResponse>("/user");
  },
  async updateUser(payload: UpdateUserRequest) {
    return await instance.post<UserResponse>("/user", { user: payload });
  },
};

export default userApi;
