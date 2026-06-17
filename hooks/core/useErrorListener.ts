import { useEffect, useRef } from "react";
import { toast } from "sonner-native";
import { useErrorStore } from "@/stores/core/error.store";

const ERROR_CONFIG: Record<string, { emoji: string; title: string }> = {
  validation: { emoji: "⚠️", title: "Validation Error" },
  auth: { emoji: "🔒", title: "Session Expired" },
  forbidden: { emoji: "🚫", title: "Access Denied" },
  not_found: { emoji: "🔍", title: "Not Found" },
  server: { emoji: "🛠️", title: "Server Error" },
  network: { emoji: "📡", title: "Network Error" },
  unknown: { emoji: "❌", title: "Something went wrong" },
};

export function ErrorToastListener() {
  const error = useErrorStore((s) => s.error);
  const clearError = useErrorStore((s) => s.clearError);
  const prevErrorRef = useRef<typeof error>(null);

  useEffect(() => {
    if (!error || error === prevErrorRef.current) return;
    prevErrorRef.current = error;

    const config = ERROR_CONFIG[error.type] ?? ERROR_CONFIG.unknown;

    toast.error(`${config.emoji} ${config.title}`, {
      description: error.message,
      duration:
        error.type === "server" || error.type === "network" ? 5000 : 3500,
      onDismiss: () => {
        clearError();
        prevErrorRef.current = null;
      },
    });
  }, [error]);

  return null;
}
