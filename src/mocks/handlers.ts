import { rest } from "msw";
import { BASE_URL } from "~/api/base";
import {
  type LoginUserRequest,
  type RegisterUserRequest,
} from "~/api/services/user";
import user from "~/test_data/user";

// https://github.com/mswjs/msw/issues/397#issuecomment-751230924
export const baseUrl = (path: string): string => BASE_URL + path;

const handlers = [
  rest.post<RegisterUserRequest>(baseUrl("/users"), async (req, res, ctx) => {
    const {
      user: { username, email, password },
    } = await req.json();

    const errorResponse: Record<string, string> = {};
    if (email === "") {
      errorResponse.email = "can't be blank";
      return await res(ctx.status(422), ctx.json({ errors: errorResponse }));
    }
    if (username === "") {
      errorResponse.username = "can't be blank";
      return await res(ctx.status(422), ctx.json({ errors: errorResponse }));
    }
    if (password === "") {
      errorResponse.password = "can't be blank";
      return await res(ctx.status(422), ctx.json({ errors: errorResponse }));
    }

    return await res(
      ctx.json({
        user: {
          ...user,
          email,
          username,
        },
      })
    );
  }),
  rest.post<LoginUserRequest>(
    baseUrl("/users/login"),
    async (req, res, ctx) => {
      const {
        user: { email, password },
      } = await req.json();

      const errorResponse: Record<string, string> = {};
      if (email === "") {
        errorResponse.email = "can't be blank";
        return await res(ctx.status(422), ctx.json({ errors: errorResponse }));
      }
      if (password === "") {
        errorResponse.password = "can't be blank";
        return await res(ctx.status(422), ctx.json({ errors: errorResponse }));
      }

      return await res(
        ctx.json({
          user: {
            ...user,
            email,
          },
        })
      );
    }
  ),
];

export default handlers;
