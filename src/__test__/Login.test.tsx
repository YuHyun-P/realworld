import { act, screen, waitFor } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Login from "~/pages/Login";
import userAtom from "~/recoil/atoms/userState";
import { renderWithRecoil, RecoilObserver } from "~/test-utils/recoilWrapper";

import userEvent from "@testing-library/user-event";
import server from "~/mocks/server";
import { rest } from "msw";
import { type LoginUserRequest } from "~/api/services/user";
import { baseUrl } from "../mocks/handlers";

const navigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigate,
}));

test("로그인 초기 렌더링", () => {
  renderWithRecoil(
    <HashRouter>
      <Login />
    </HashRouter>
  );

  const email = screen.getByPlaceholderText(/email/i);
  const password = screen.getByPlaceholderText(/password/i);
  const submitButton = screen.getByRole("button", { name: /sign in/i });

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeEnabled();
});

test("로그인 성공", async () => {
  const TEST_USER = {
    username: "test",
    email: "test@test",
    image: "image",
    token: "token",
    bio: null,
  };

  server.resetHandlers(
    rest.post<LoginUserRequest>(
      baseUrl("/users/login"),
      async (req, res, ctx) =>
        await res(
          ctx.delay(1000),
          ctx.json({
            user: TEST_USER,
          })
        )
    )
  );

  const userAtomChange = jest.fn();
  renderWithRecoil(
    <>
      <RecoilObserver node={userAtom} onChange={userAtomChange} />
      <HashRouter>
        <Login />
      </HashRouter>
    </>
  );

  const user = userEvent.setup();

  expect(userAtomChange).toHaveBeenCalledWith(null);

  const email = screen.getByPlaceholderText(/email/i);
  const password = screen.getByPlaceholderText(/password/i);
  const submitButton = screen.getByRole("button", { name: /sign in/i });

  await user.clear(email);
  await user.type(email, TEST_USER.email);

  await user.clear(password);
  await user.type(password, "123");

  await act(async () => {
    await user.click(submitButton);
  });

  expect(submitButton).toBeDisabled();

  await waitFor(
    () => {
      expect(userAtomChange).toHaveBeenLastCalledWith(TEST_USER);
    },
    { timeout: 2000 }
  );
  expect(navigate).toHaveBeenCalledWith("/");
  expect(submitButton).toBeEnabled();
});

test("로그인 실패 시 에러 메시지가 표시된다.", async () => {
  renderWithRecoil(
    <HashRouter>
      <Login />
    </HashRouter>
  );

  const user = userEvent.setup();

  const email = screen.getByPlaceholderText(/email/i);
  const submitButton = screen.getByRole("button", { name: /sign in/i });

  await user.clear(email);

  await act(async () => {
    await user.click(submitButton);
  });

  const errorMessages = screen
    .getAllByRole("listitem")
    .map((item) => item.textContent);
  expect(errorMessages).toEqual(["email can't be blank"]);
});
