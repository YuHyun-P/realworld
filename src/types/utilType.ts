export type ElementsWith<T> = HTMLFormControlsCollection & {
  [K in keyof T]: {
    value: T[K];
  };
};
