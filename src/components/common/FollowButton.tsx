import { useState, type ReactElement } from "react";

interface FollowButtonProps {
  username: string;
  defaultValue: boolean;
}

function FollowButton({
  username,
  defaultValue,
}: FollowButtonProps): ReactElement {
  const [follow, setFollow] = useState({
    isLoading: false,
    following: defaultValue,
  });

  const handleClick = (): void => {
    // mock api
    setFollow((prev) => ({
      ...prev,
      isLoading: true,
    }));

    setTimeout(() => {
      setFollow((prev) => ({
        ...prev,
        isLoading: false,
        following: !prev.following,
      }));
    }, 1000);
  };

  return (
    <button
      className={`btn btn-sm ${
        follow.following ? "btn-secondary" : "btn-outline-secondary"
      }`}
      type="button"
      onClick={handleClick}
      disabled={follow.isLoading}
    >
      <i className="ion-plus-round" /> &nbsp;{" "}
      {follow.following ? "Unfollow" : "Follow"} {username}
    </button>
  );
}

export default FollowButton;
