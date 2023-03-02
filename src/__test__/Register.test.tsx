import { act, screen, waitFor } from "@testing-library/react";
import userAtom from "~/recoil/atoms/userState";
import { HashRouter } from "react-router-dom";
import Register from "~/pages/Register";
import { RecoilObserver, renderWithRecoil } from "~/test-utils/recoilWrapper";
import userEvent from "@testing-library/user-event";
import server from "~/mocks/server";
import { rest } from "msw";
import { baseUrl } from "~/mocks/handlers";

const navigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigate,
}));

test("회원가입 초기 렌더링", () => {
  renderWithRecoil(
    <HashRouter>
      <RecoilObserver node={userAtom} onChange={jest.fn()} />
      <Register />
    </HashRouter>
  );

  const usernameInput = screen.getByPlaceholderText("Your Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const signUpButton = screen.getByRole("button", { name: "Sign up" });

  expect(usernameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});

test("회원가입 성공", async () => {
  const TEST_USER = {
    username: "test",
    email: "test@test",
    image: "image",
    token: "token",
    bio: null,
  };

  server.resetHandlers(
    rest.post(
      baseUrl("/users"),
      async (req, res, ctx) =>
        await res(
          ctx.delay(1000),
          ctx.json({
            user: TEST_USER,
          })
        )
    )
  );

  const user = userEvent.setup();

  const onUserAtomChange = jest.fn();
  renderWithRecoil(
    <HashRouter>
      <RecoilObserver node={userAtom} onChange={onUserAtomChange} />
      <Register />
    </HashRouter>
  );

  expect(onUserAtomChange).toHaveBeenLastCalledWith(null);

  const usernameInput = screen.getByPlaceholderText("Your Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const signUpButton = screen.getByRole("button", { name: "Sign up" });

  await user.clear(usernameInput);
  await user.type(usernameInput, TEST_USER.username);

  await user.clear(emailInput);
  await user.type(emailInput, TEST_USER.email);

  await user.clear(passwordInput);
  await user.type(passwordInput, "test");

  await act(async () => {
    await user.click(signUpButton);
  });

  await waitFor(() => {
    expect(signUpButton).toBeDisabled();
  });

  const isFieldsetElement = (
    element: unknown
  ): element is HTMLFieldSetElement => element instanceof HTMLFieldSetElement;

  const expectedDisabledStates = [true, true, true];
  const fieldsetElements = screen
    .getAllByRole("group")
    .filter(isFieldsetElement);

  expect(fieldsetElements.map((element) => element.disabled)).toEqual(
    expectedDisabledStates
  );

  await waitFor(
    () => {
      expect(onUserAtomChange).toHaveBeenLastCalledWith(TEST_USER);
    },
    { timeout: 2000 }
  );
  expect(localStorage.getItem("token")).toBe(JSON.stringify(TEST_USER.token));
  expect(navigate).toHaveBeenCalledWith("/");

  await waitFor(() => {
    expect(signUpButton).toBeEnabled();
  });
});

test("회원가입 실패 시 에러 메시지가 표시된다", async () => {
  const user = userEvent.setup();

  renderWithRecoil(
    <HashRouter>
      <RecoilObserver node={userAtom} onChange={jest.fn()} />
      <Register />
    </HashRouter>
  );

  const signUpButton = screen.getByRole("button", { name: "Sign up" });

  await act(async () => {
    await user.click(signUpButton);
  });

  await waitFor(() => {
    const errorMessages = screen
      .getAllByRole("listitem")
      .map((item) => item.textContent);
    expect(errorMessages).toEqual(["email can't be blank"]);
  });
});
