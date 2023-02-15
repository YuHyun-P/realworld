import { type FormEventHandler, type ReactElement } from "react";
import { Link } from "react-router-dom";
import AuthPageLayout from "~/components/layout/AuthPageLayout";
import RegisterForm from "~/components/pages/register/RegisterForm";
import ErrorMessage from "../components/common/ErrorMessage";

function Register(): ReactElement {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const {
      username: { value: name },
      email: { value: email },
      password: { value: password },
    } = e.currentTarget;
    console.log(name, email, password);
  };

  return (
    <AuthPageLayout>
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <Link to="/login">Have an account?</Link>
      </p>
      <ErrorMessage />
      <RegisterForm onSubmit={handleSubmit} disabled={false} />
    </AuthPageLayout>
  );
}

export default Register;
