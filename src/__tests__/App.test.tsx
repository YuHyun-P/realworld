import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

test("App", async () => {
  render(<App />);
  const user = userEvent.setup();

  const button = screen.getByRole("button");
  expect(button).toHaveTextContent(/0/);

  await user.click(button);
  expect(button).toHaveTextContent(/1/);
});
