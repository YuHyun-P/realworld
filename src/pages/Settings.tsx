import { type ReactElement } from "react";
import SettingForm from "~/components/pages/settings/SettingForm";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "~/recoil/atoms/userState";
import userApi, { type UpdateUserRequest } from "~/api/services/user";
import useForm from "~/hooks/useForm";
import { type ElementsWith } from "../types/utilType";

function Settings(): ReactElement | null {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const { isLoading, handleSubmit } = useForm(async (e) => {
    e.preventDefault();

    const {
      image: { value: image },
      username: { value: username },
      bio: { value: bio },
      email: { value: email },
      password: { value: password },
    } = e.currentTarget.elements as ElementsWith<UpdateUserRequest>;

    const {
      data: { user: updatedUser },
    } = await userApi.updateUser({ image, username, bio, email, password });

    setUser(updatedUser);
    navigate(`/${updatedUser.username}`);
  });

  const handleLogout = (): void => {
    setUser(null);
    navigate("/");
  };

  if (user === null) {
    navigate("/");
    return null;
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <SettingForm
              user={user}
              onSubmit={handleSubmit}
              disabled={isLoading}
            />
            <hr />
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={handleLogout}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
