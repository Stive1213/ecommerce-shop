"use client";

import { Loader2 } from "lucide-react"; // Optional: icon spinner
import { cn } from "@/lib/utils"; // if you have a utility for classNames

export const Loader = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
};
