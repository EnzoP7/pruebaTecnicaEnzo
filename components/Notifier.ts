"use client";

import { toast } from "sonner";

type ToastType = "success" | "error" | "info";

export function notify(message: string, type: ToastType = "info") {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
  }
}
