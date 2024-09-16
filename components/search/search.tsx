"use client";

import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

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

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder || "Buscar..."}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        className="w-full rounded-full pl-10 pr-12 bg-muted/50 focus-visible:bg-background transition-colors"
      />
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
