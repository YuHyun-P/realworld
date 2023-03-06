import { type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "~/recoil/atoms/userState";

interface RequireAuthProps {
  children: ReactElement | null;
}

function RequireAuth({ children }: RequireAuthProps): ReactElement | null {
  const user = useRecoilValue(userAtom);

  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAuth;
