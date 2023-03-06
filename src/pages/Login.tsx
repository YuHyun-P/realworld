import { type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthPageLayout from "~/components/layout/AuthPageLayout";
import { useSetRecoilState } from "recoil";
import userAtom from "~/recoil/atoms/userState";
import userApi, { type LoginUserRequest } from "~/api/services/user";
import storage from "~/utils/storage";
import useForm from "~/hooks/useForm";
import { type ElementsWith } from "~/types/utilType";
import ErrorMessage from "~/components/common/ErrorMessage";
import LoginForm from "~/components/pages/login/LoginForm";

function Login(): ReactElement {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const { error, isLoading, handleSubmit } = useForm(
    async ({ currentTarget }) => {
      const payload = currentTarget.elements as ElementsWith<LoginUserRequest>;

      const {
        email: { value: email },
        password: { value: password },
      } = payload;

      const {
        data: { user },
      } = await userApi.login({ email, password });

      setUser(user);
      storage("local").setItem("token", user.token);
      navigate("/");
    }
  );

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
