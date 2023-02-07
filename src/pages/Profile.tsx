import { type ReactElement } from "react";
import { useParams } from "react-router-dom";

function Profile(): ReactElement {
  const { username } = useParams();

  return (
    <>
      <div>Profile</div>
      <div>{username}</div>
    </>
  );
}

export default Profile;
