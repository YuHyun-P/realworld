import { HashRouter } from "react-router-dom";
import Settings from "~/pages/Settings";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InitUser from "~/test-utils/InitUser";
import userAtom from "~/recoil/atoms/userState";
import MOCK_USER from "~/test_data/user";
import server from "~/mocks/server";
import { rest } from "msw";
import { baseUrl } from "~/mocks/handlers";
import { renderWithRecoil, RecoilObserver } from "../test-utils/recoilWrapper";

const navigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigate,
}));

test("로그인한 사용자일 때 설정 페이지 초기 렌더링", () => {
  const BEFORE_USER = {
    image: "image",
    username: "test",
    bio: "bio",
    email: "test@test",
    token: "token",
  };

  renderWithRecoil(
    <HashRouter>
      <InitUser user={BEFORE_USER} />
      <Settings />
    </HashRouter>
  );

  const image = screen.getByPlaceholderText<HTMLInputElement>(/picture/i);
  const username = screen.getByPlaceholderText<HTMLInputElement>(/name/i);
  const bio = screen.getByPlaceholderText<HTMLInputElement>(/bio/i);
  const email = screen.getByPlaceholderText<HTMLInputElement>(/email/i);
  const password = screen.getByPlaceholderText<HTMLInputElement>(/password/i);
  const submitButton = screen.getByRole("button", { name: /update/i });
  const logoutButton = screen.getByRole("button", { name: /logout/i });

  expect(image.value).toBe(BEFORE_USER.image);
  expect(username.value).toBe(BEFORE_USER.username);
  expect(bio.value).toBe(BEFORE_USER.bio);
  expect(email.value).toBe(BEFORE_USER.email);
  expect(password.value).toBe("");
  expect(submitButton).toBeEnabled();
  expect(logoutButton).toBeEnabled();
});

test("로그인하지 않은 사용자일 때 설정 페이지 초기 렌더링", () => {
  renderWithRecoil(
    <HashRouter>
      <Settings />
    </HashRouter>
  );

  const image = screen.queryByPlaceholderText<HTMLInputElement>(/picture/i);
  const username = screen.queryByPlaceholderText<HTMLInputElement>(/name/i);
  const bio = screen.queryByPlaceholderText<HTMLInputElement>(/bio/i);
  const email = screen.queryByPlaceholderText<HTMLInputElement>(/email/i);
  const password = screen.queryByPlaceholderText<HTMLInputElement>(/password/i);
  const submitButton = screen.queryByRole("button", { name: /update/i });
  const logoutButton = screen.queryByRole("button", { name: /logout/i });

  expect(image).not.toBeInTheDocument();
  expect(username).not.toBeInTheDocument();
  expect(bio).not.toBeInTheDocument();
  expect(email).not.toBeInTheDocument();
  expect(password).not.toBeInTheDocument();
  expect(submitButton).not.toBeInTheDocument();
  expect(logoutButton).not.toBeInTheDocument();

  expect(navigate).toHaveBeenCalledWith("/");
});

test("회원 정보 갱신 성공", async () => {
  const BEFORE_USER = {
    image: "image",
    username: "test",
    bio: "bio",
    email: "test@test",
    token: "token",
  };

  const AFTER_USER = {
    image: "updated image",
    username: "updatedUsername",
    bio: "updated bio",
    email: "updated@email",
    token: MOCK_USER.token,
  };

  server.resetHandlers(
    rest.put(baseUrl("/user"), async (req, res, ctx) => {
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

      return await res(ctx.delay(1000), ctx.json({ user: updatedUser }));
    })
  );

  const handleUserChange = jest.fn();

  renderWithRecoil(
    <HashRouter>
      <InitUser user={BEFORE_USER} />
      <RecoilObserver node={userAtom} onChange={handleUserChange} />
      <Settings />
    </HashRouter>
  );

  const user = userEvent.setup();

  const topLevelFieldSet = screen.getAllByRole("group")[0];
  const image = screen.getByPlaceholderText<HTMLInputElement>(/picture/i);
  const username = screen.getByPlaceholderText<HTMLInputElement>(/name/i);
  const bio = screen.getByPlaceholderText<HTMLInputElement>(/bio/i);
  const email = screen.getByPlaceholderText<HTMLInputElement>(/email/i);
  const password = screen.getByPlaceholderText<HTMLInputElement>(/password/i);
  const submitButton = screen.getByRole("button", { name: /update/i });

  await user.clear(image);
  await user.type(image, AFTER_USER.image);

  await user.clear(username);
  await user.type(username, AFTER_USER.username);

  await user.clear(bio);
  await user.type(bio, AFTER_USER.bio);

  await user.clear(email);
  await user.type(email, AFTER_USER.email);

  await user.clear(password);
  await user.type(password, "123");

  await act(async () => {
    await user.click(submitButton);
  });

  expect(topLevelFieldSet).toBeDisabled();

  await waitFor(
    () => {
      expect(handleUserChange).toHaveBeenLastCalledWith(AFTER_USER);
    },
    { timeout: 2000 }
  );
  expect(navigate).toHaveBeenLastCalledWith(`/${AFTER_USER.username}`);

  await waitFor(() => {
    expect(topLevelFieldSet).toBeEnabled();
  });
});
