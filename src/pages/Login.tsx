import { type ReactElement, type FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthPageLayout from "~/components/layout/AuthPageLayout";
import { useSetRecoilState } from "recoil";
import userAtom from "~/recoil/atoms/userState";
import userApi, { type LoginUserRequest } from "~/api/services/user";
import { isAxiosError } from "axios";
import { type ErrorResponse } from "~/types";
import storage from "~/utils/storage";
import { formatErrorResponse } from "../utils/formatter";
import ErrorMessage from "../components/common/ErrorMessage";
import LoginForm from "../components/pages/login/LoginForm";

function Login(): ReactElement {
  const [error, setError] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    const payload = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      email: { value: string };
      password: { value: string };
    };

    const {
      email: { value: email },
      password: { value: password },
    } = payload;

    await fetchLogin({ email, password });
  };

  const fetchLogin = async (payload: LoginUserRequest): Promise<void> => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await userApi.login(payload);

      setUser(user);
      storage("local").setItem("token", user.token);
      navigate("/");
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        setError(formatErrorResponse(err));
      } else {
        setError(["something went wrong"]);
      }
    }
    setIsLoading(false);
  };

  return (
    <AuthPageLayout>
      <h1 className="text-xs-center">Sign in</h1>
      <p className="text-xs-center">
        <Link to="/register">Need an account?</Link>
      </p>
      <ErrorMessage error={error} />
      <LoginForm onSubmit={handleSubmit} disabled={isLoading} />
    </AuthPageLayout>
  );
}

export default Login;
