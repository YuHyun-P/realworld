import { type AxiosError, isAxiosError } from "axios";
import { type FormEventHandler, useState, type FormEvent } from "react";
import { type ErrorResponse } from "~/types";

type useFormParam = (e: FormEvent<HTMLFormElement>) => Promise<void>;

type UseFormReturn = {
  error: string[] | undefined;
  isLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export default function useForm(onSubmit: useFormParam): UseFormReturn {
  const [error, setError] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setIsLoading(true);
    try {
      await onSubmit(e);
    } catch (err) {
      if (isAxiosError<ErrorResponse>(err)) {
        setError(formatErrorResponse(err));
      } else {
        setError(["something went wrong"]);
      }
    }
    setIsLoading(false);
  };

  return { error, isLoading, handleSubmit };
}

function formatErrorResponse(error: AxiosError<ErrorResponse>): string[] {
  return Object.entries(error.response?.data.errors ?? []).map((message) =>
    message.join(" ")
  );
}
