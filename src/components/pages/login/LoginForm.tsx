import { type FormEventHandler, type ReactElement } from "react";
import Input from "~/components/common/Input";

interface LoginFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  disabled: boolean;
}

function LoginForm({ onSubmit, disabled }: LoginFormProps): ReactElement {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Email" name="email" disabled={disabled} />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        disabled={disabled}
      />
      <button
        className="btn btn-lg btn-primary pull-xs-right"
        type="submit"
        disabled={disabled}
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
