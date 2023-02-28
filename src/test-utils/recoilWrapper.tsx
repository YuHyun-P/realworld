import { render, type RenderOptions } from "@testing-library/react";
import { useEffect } from "react";
import { RecoilRoot, type RecoilValue, useRecoilValue } from "recoil";

type RecoilObserverParams<T> = {
  node: RecoilValue<T>;
  onChange: (value: T) => void;
};

export function RecoilObserver<T>({
  node,
  onChange,
}: RecoilObserverParams<T>): null {
  const value = useRecoilValue(node);
  useEffect(() => {
    onChange(value);
  }, [onChange, value]);
  return null;
}

export function renderWithRecoil(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): ReturnType<typeof render> {
  return render(ui, { wrapper: recoilTestWrapper, ...options });
}

const recoilTestWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <RecoilRoot>{children}</RecoilRoot>;
