import { type ReactElement, type ReactNode } from "react";
import { type To, Link } from "react-router-dom";

export interface TabItemProps {
  to: To;
  children: ReactNode;
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}

function TabItem({
  to,
  children,
  name,
  isActive = false,
  onClick,
}: TabItemProps): ReactElement {
  const handleClick = (): void => {
    if (onClick === undefined) {
      return;
    }

    onClick();
  };

  return (
    <li className="nav-item">
      <Link
        to={to}
        onClick={handleClick}
        className={`nav-link ${isActive ? "active" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
}

export default TabItem;
