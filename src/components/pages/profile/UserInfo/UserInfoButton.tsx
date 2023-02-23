import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import FollowButton from "~/components/common/FollowButton";
import user from "~/test_data/user";

interface UserInfoButtonProps {
  username: string;
  following: boolean;
}

function UserInfoButton({
  username,
  following,
}: UserInfoButtonProps): ReactElement {
  if (user.username === username) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn"
      >
        <i className="ion-gear-a" /> Edit Profile Settings
      </Link>
    );
  }
  return <FollowButton username={username} defaultValue={following} isAction />;
}

export default UserInfoButton;
