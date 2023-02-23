import { type ReactElement } from "react";
import { type Profile } from "~/types";
import UserInfoButton from "./UserInfoButton";

interface UserInfoProps extends Profile {}

function UserInfo({
  image,
  username,
  bio,
  following,
}: UserInfoProps): ReactElement {
  return (
    <>
      <img src={image} className="user-img" alt="" />
      <h4>{username}</h4>
      <p>{bio}</p>
      <UserInfoButton username={username} following={following} />
    </>
  );
}

export default UserInfo;
