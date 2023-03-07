import { type FormEventHandler, type ReactElement } from "react";
import Input from "~/components/common/Input";
import Textarea from "~/components/common/Textarea";
import { type User } from "~/types";

interface SettingFormProps {
  user: User;
  onSubmit: FormEventHandler<HTMLFormElement>;
  disabled: boolean;
}

function SettingForm({
  user,
  onSubmit,
  disabled,
}: SettingFormProps): ReactElement {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={disabled}>
        <Input
          type="text"
          placeholder="URL of profile picture"
          defaultValue={user.image}
          name="image"
        />
        <Input
          type="text"
          placeholder="Your Name"
          defaultValue={user.username}
          name="username"
          large
        />
        <Textarea
          rows={8}
          placeholder="Short bio about you"
          defaultValue={user.bio ?? ""}
          name="bio"
          large
        />
        <Input
          type="email"
          placeholder="Email"
          defaultValue={user.email}
          name="email"
          large
        />
        <Input type="password" placeholder="Password" name="password" large />

        <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
          Update Settings
        </button>
      </fieldset>
    </form>
  );
}

export default SettingForm;
