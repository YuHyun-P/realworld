import { type ReactElement } from "react";

interface ErrorMessageProps {
  error?: string[];
}

function ErrorMessage({ error }: ErrorMessageProps): ReactElement | null {
  if (error === undefined) return null;
  return (
    <ul className="error-messages">
      {error.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}

export default ErrorMessage;
