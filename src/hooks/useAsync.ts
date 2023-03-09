import { useCallback, useState } from "react";

export type DataState<Data, Error> = {
  data: Data | undefined;
  isLoading: boolean;
  error: Error | null;
};

type UseAsyncReturn<Data, Error> = DataState<Data, Error> & {
  setLoading: () => void;
  setData: (data: Data) => void;
  setError: (error: Error) => void;
};

function useAsync<Data = unknown, Error = unknown>(
  initialData?: Data
): UseAsyncReturn<Data, Error> {
  const [state, setState] = useState<DataState<Data, Error>>({
    data: initialData,
    isLoading: false,
    error: null,
  });

  const setLoading = useCallback((): void => {
    setState((prev) => ({ ...prev, isLoading: true }));
  }, []);

  const setData = useCallback((data: Data): void => {
    setState(() => ({ data, isLoading: false, error: null }));
  }, []);

  const setError = useCallback((error: Error): void => {
    setState({ isLoading: false, data: undefined, error });
  }, []);

  return { ...state, setLoading, setData, setError };
}

export default useAsync;
