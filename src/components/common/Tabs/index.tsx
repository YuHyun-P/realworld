import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type ReactElement,
} from "react";
import { type TabItemProps } from "./TabItem";

type ChildrenType =
  | ReactElement<TabItemProps>
  | Array<ReactElement<TabItemProps> | null>;

interface TabsProps {
  children: ChildrenType;
  defaultValue?: string;
  onChange: (name: string) => void;
}

function Tabs({ children, defaultValue, onChange }: TabsProps): ReactElement {
  const [current, setCurrent] = useState(defaultValue);

  const TabItemArray = Children.toArray(children).filter(
    isValidElement<TabItemProps>
  );

  const handleChangeWrapper = (name: string) => () => {
    setCurrent(name);
    onChange(name);
  };

  return (
    <ul className="nav nav-pills outline-active">
      {TabItemArray.map((child) =>
        cloneElement(child, {
          onClick: handleChangeWrapper(child.props.name),
          isActive: current === child.props.name,
        })
      )}
    </ul>
  );
}

export default Tabs;
