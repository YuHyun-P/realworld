import { useEffect } from "react";
import { type User } from "~/types";
import storage from "~/utils/storage";
import { useSetRecoilState } from "recoil";
import userAtom from "~/recoil/atoms/userState";

interface InitUserProps {
  user: User;
}

function InitUser({ user }: InitUserProps): null {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const { token } = user;
    storage("local").setItem("token", token);
    setUser(user);
  }, [user, setUser]);

  return null;
}

export default InitUser;
