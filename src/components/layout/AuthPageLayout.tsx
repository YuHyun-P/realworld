import { type ReactElement } from "react";

interface AuthPageLayoutProps {
  children: ReactElement[];
}

function AuthPageLayout({ children }: AuthPageLayoutProps): ReactElement {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthPageLayout;