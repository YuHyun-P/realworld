import { type ReactElement, type FormEventHandler } from "react";
import { Link } from "react-router-dom";
import AuthPageLayout from "~/components/layout/AuthPageLayout";
import LoginForm from "../components/pages/login/LoginForm";
import ErrorMessage from "../components/common/ErrorMessage";

function Login(): ReactElement {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const {
      email: { value: email },
      password: { value: password },
    } = e.currentTarget;
    console.log(email, password);
  };

  return (
    <AuthPageLayout>
      <h1 className="text-xs-center">Sign in</h1>
      <p className="text-xs-center">
        <Link to="/register">Need an account?</Link>
      </p>
      <ErrorMessage message="error" />
      <LoginForm onSubmit={handleSubmit} disabled={false} />
    </AuthPageLayout>
  );
}

export default Login;
