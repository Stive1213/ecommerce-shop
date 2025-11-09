"use client";

import { toast as sonnerToast } from "sonner";

export const toast = (options: any) => {
  return sonnerToast(options.title, {
    description: options.description,
    ...options,
  });
};
