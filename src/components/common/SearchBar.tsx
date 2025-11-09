"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  placeholder = "Search products...",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") || "";
      setQuery(q);
    }
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const clearSearch = () => {
    setQuery("");
    if (pathname === "/search") {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative flex items-center ${className}`}
    >
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
