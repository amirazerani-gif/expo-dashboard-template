import { create } from "zustand";

type ErrorType =
  | "validation"
  | "auth"
  | "forbidden"
  | "not_found"
  | "server"
  | "network"
  | "unknown";

export interface ParsedError {
  message: string;
  type: ErrorType;
  status: number | null;
  validationErrors: Record<string, string[]> | null;
}

interface ErrorState {
  error: ParsedError | null;
  showError: (raw: unknown, silent?: boolean) => never;
  clearError: () => void;
}

function isAxiosError(
  err: unknown,
): err is { response?: { status: number; data: any }; message?: string } {
  return typeof err === "object" && err !== null && "response" in err;
}

function parseError(raw: unknown): ParsedError {
  if (!isAxiosError(raw)) {
    return {
      message: "An unexpected error occurred.",
      type: "unknown",
      status: null,
      validationErrors: null,
    };
  }

  const response = raw.response;

  if (!response) {
    return {
      message: "Network error. Please check your connection.",
      type: "network",
      status: null,
      validationErrors: null,
    };
  }

  const { status, data } = response;

  if (status === 422) {
    const validationErrors: Record<string, string[]> = data?.errors ?? null;
    const firstError = validationErrors
      ? Object.values(validationErrors).flat()[0]
      : null;
    return {
      message: firstError ?? data?.message ?? "Validation failed.",
      type: "validation",
      status,
      validationErrors,
    };
  }

  if (status === 401)
    return {
      message: data?.message ?? "Session expired. Please log in again.",
      type: "auth",
      status,
      validationErrors: null,
    };
  if (status === 403)
    return {
      message: data?.message ?? "You do not have permission.",
      type: "forbidden",
      status,
      validationErrors: null,
    };
  if (status === 404)
    return {
      message: data?.message ?? "Resource not found.",
      type: "not_found",
      status,
      validationErrors: null,
    };
  if (status >= 500)
    return {
      message: "A server error occurred. Please try again later.",
      type: "server",
      status,
      validationErrors: null,
    };

  return {
    message: data?.message ?? "Something went wrong.",
    type: "unknown",
    status,
    validationErrors: null,
  };
}

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,

  showError: (raw, silent = false) => {
    const parsed = parseError(raw);
    console.error(
      `[ERROR] ${parsed.type.toUpperCase()} | Status: ${parsed.status ?? "N/A"} | ${parsed.message}`,
      "\nRaw:",
      raw,
    );
    if (parsed.validationErrors)
      console.error("Validation errors:", parsed.validationErrors);

    if (!silent) {
      set({ error: parsed });
    }
    throw raw;
  },

  clearError: () => set({ error: null }),
}));
