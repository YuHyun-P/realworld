import { type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userApi, { type RegisterUserRequest } from "~/api/services/user";
import AuthPageLayout from "~/components/layout/AuthPageLayout";
import RegisterForm from "~/components/pages/register/RegisterForm";
import ErrorMessage from "~/components/common/ErrorMessage";
import userAtom from "~/recoil/atoms/userState";
import storage from "~/utils/storage";
import useForm from "~/hooks/useForm";
import { type ElementsWith } from "~/types/utilType";

function Register(): ReactElement {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const { error, isLoading, handleSubmit } = useForm(async (e) => {
    const payload = e.currentTarget
      .elements as ElementsWith<RegisterUserRequest>;

    const {
      username: { value: username },
      email: { value: email },
      password: { value: password },
    } = payload;

    const {
      data: { user },
    } = await userApi.register({ username, email, password });

    setUser(user);
    storage("local").setItem("token", user.token);
    navigate("/");
  });

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
