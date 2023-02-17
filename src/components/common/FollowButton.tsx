import { useEffect, useState, type ReactElement } from "react";

interface FollowButtonProps {
  username: string;
  defaultValue: boolean;
  onToggleFollow: (value: boolean) => void;
}

function FollowButton({
  username,
  defaultValue,
  onToggleFollow,
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
      onToggleFollow(!follow.following);
    }, 1000);
  };

  useEffect(() => {
    if (follow.isLoading) {
      return;
    }

    setFollow({
      ...follow,
      following: defaultValue,
    });
  }, [defaultValue]);

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
