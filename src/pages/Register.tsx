import { type AxiosError, isAxiosError } from "axios";
import { type FormEvent, useState, type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userApi, { type RegisterUserRequest } from "~/api/services/user";
import AuthPageLayout from "~/components/layout/AuthPageLayout";
import RegisterForm from "~/components/pages/register/RegisterForm";
import ErrorMessage from "~/components/common/ErrorMessage";
import userAtom from "~/recoil/atoms/userState";
import { type ErrorResponse } from "~/types";
import storage from "~/utils/storage";

function Register(): ReactElement {
  const [error, setError] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const payload = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const {
      username: { value: username },
      email: { value: email },
      password: { value: password },
    } = payload;

    await fetchRegister({ username, email, password });
  };

  const fetchRegister = async (payload: RegisterUserRequest): Promise<void> => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await userApi.register(payload);

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
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <Link to="/login">Have an account?</Link>
      </p>
      <ErrorMessage error={error} />
      <RegisterForm onSubmit={handleSubmit} disabled={isLoading} />
    </AuthPageLayout>
  );
}

export default Register;

function formatErrorResponse(error: AxiosError<ErrorResponse>): string[] {
  return Object.entries(error.response?.data.errors ?? []).map((message) =>
    message.join(" ")
  );
}
