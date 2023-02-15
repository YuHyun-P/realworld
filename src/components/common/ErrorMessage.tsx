import { type ReactElement } from "react";

interface ErrorMessageProps {
  message?: string;
}

function ErrorMessage({ message }: ErrorMessageProps): ReactElement | null {
  if (message === undefined) return null;
  return (
    <ul className="error-messages">
      <li>{message}</li>
    </ul>
  );
}

export default ErrorMessage;
