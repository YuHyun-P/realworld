type GetItem = <T>(key: string, defaultValue: T) => string | T;
type SetItem = (key: string, value: unknown) => void;
type RemoveItem = (key: string) => void;
type StorageReturn = {
  getItem: GetItem;
  setItem: SetItem;
  removeItem: RemoveItem;
};

function storage(type: "local" | "session"): StorageReturn {
  const curStorage = type === "local" ? localStorage : sessionStorage;

  const getItem: GetItem = (key, defaultValue) => {
    const value = curStorage.getItem(key);
    if (value === null) return defaultValue;
    return JSON.parse(value);
  };
  const setItem: SetItem = (key, value) => {
    curStorage.setItem(key, JSON.stringify(value));
  };
  const removeItem: RemoveItem = (key) => {
    curStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
}

export default storage;
