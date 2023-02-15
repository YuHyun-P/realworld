import { type FormEventHandler, type ReactElement } from "react";
import { Link } from "react-router-dom";
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
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ErrorMessage />
            <RegisterForm onSubmit={handleSubmit} disabled={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
