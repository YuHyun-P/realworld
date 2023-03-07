import { type User } from "~/types";
import { unauth, auth } from "../base";

export type LoginUserRequest = {
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
    return await unauth.post<UserResponse>("/users/login", { user: payload });
  },
  async register(payload: RegisterUserRequest) {
    return await unauth.post<UserResponse>("/users", { user: payload });
  },
  async getUser() {
    return await auth.post<UserResponse>("/user");
  },
  async updateUser(payload: UpdateUserRequest) {
    return await auth.post<UserResponse>("/user", { user: payload });
  },
};

export default userApi;
