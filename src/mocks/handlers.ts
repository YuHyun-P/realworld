import { rest } from "msw";
import { BASE_URL } from "~/api/base";
import MOCK_USER from "~/test_data/user";

// https://github.com/mswjs/msw/issues/397#issuecomment-751230924
export const baseUrl = (path: string): string => BASE_URL + path;

const UnauthorizedErrorBody = {
  status: "error",
  message: "missing authorization credentials",
};

const handlers = [
  rest.post(baseUrl("/users"), async (req, res, ctx) => {
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
          ...MOCK_USER,
          email,
          username,
        },
      })
    );
  }),
  rest.post(baseUrl("/users/login"), async (req, res, ctx) => {
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
          ...MOCK_USER,
          email,
        },
      })
    );
  }),
  rest.put(baseUrl("/user"), async (req, res, ctx) => {
    if (!hasToken(req.headers)) {
      return await res(ctx.status(401), ctx.json(UnauthorizedErrorBody));
    }

    const {
      user: { image, username, email, bio },
    } = await req.json();

    const updatedUser = {
      image: image ?? MOCK_USER.image,
      username: username ?? MOCK_USER.username,
      email: email ?? MOCK_USER.email,
      bio: bio ?? MOCK_USER.bio,
      token: MOCK_USER.token,
    };

    return await res(ctx.json({ user: updatedUser }));
  }),
];

export default handlers;

function hasToken(headers: Headers): boolean {
  const prefix = "Token ";
  const authorization = headers.get("Authorization");
  if (authorization === null || !authorization.startsWith(prefix)) {
    return false;
  }

  const token = authorization.substring(prefix.length);
  return token !== "";
}
