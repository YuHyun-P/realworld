import { type FormEventHandler, type ReactElement } from "react";
import Input from "~/components/common/Input";

interface RegisterFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  disabled: boolean;
}

function RegisterForm({ onSubmit, disabled }: RegisterFormProps): ReactElement {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Your Name"
        name="username"
        disabled={disabled}
      />
      <Input
        type="email"
        placeholder="Email"
        name="email"
        disabled={disabled}
      />
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
        Sign up
      </button>
    </form>
  );
}

export default RegisterForm;
