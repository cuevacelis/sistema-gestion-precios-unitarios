"use client";

import { cn } from "@/lib/utils";
import { Search as SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useRef } from "react";

export default function Search({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("query")?.toString() || ""
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch.flush();
  };

  const handleClear = () => {
    setSearchTerm("");
    handleSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <style jsx>{`
        input[type="search"]::-webkit-search-cancel-button {
          -webkit-appearance: none;
          display: none;
        }
      `}</style>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder || "Buscar..."}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        className="w-full rounded-full pl-10 pr-24 bg-muted/50 focus-visible:bg-background transition-colors"
      />
      {searchTerm && (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={handleClear}
          className="absolute right-20 top-1/2 -translate-y-1/2 px-2 py-1"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Limpiar búsqueda</span>
        </Button>
      )}
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted"
      >
        Buscar
      </Button>
    </form>
  );
}
