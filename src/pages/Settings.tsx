import { type FormEventHandler, type ReactElement } from "react";
import user from "~/test_data/user";
import SettingForm from "~/components/pages/settings/SettingForm";
import { useNavigate } from "react-router-dom";

function Settings(): ReactElement {
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const {
      image: { value: image },
      username: { value: username },
      bio: { value: bio },
      email: { value: email },
      password: { value: password },
    } = e.currentTarget;
    console.log(image, username, bio, email, password);
  };
  const handleLogout = (): void => {
    // session clear
    navigate("/");
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <SettingForm user={user} onSubmit={handleSubmit} />
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
