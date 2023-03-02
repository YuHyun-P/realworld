import { type AxiosError } from "axios";
import { type ErrorResponse } from "~/types";

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatErrorResponse(
  error: AxiosError<ErrorResponse>
): string[] {
  return Object.entries(error.response?.data.errors ?? []).map((message) =>
    message.join(" ")
  );
}
