"use client";

import { cn } from "@/lib/utils";
import { Search as SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import Form from "next/form";

interface ISearchProps {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function Search({
  placeholder,
  className,
  disabled = false,
}: ISearchProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Form action="" className={cn("relative", className)}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input name="page" type="hidden" value="1" />
      <Input
        ref={inputRef}
        type="search"
        name="query"
        disabled={disabled}
        placeholder={placeholder || "Buscar..."}
        defaultValue={searchParams.get("query")?.toString() || ""}
        onChange={(e) => {
          if (e.target.value === "") {
            clearSearch();
          } else {
            handleSearch(e.target.value);
          }
        }}
        className="w-full rounded-full pl-10 pr-24 bg-muted/50 focus-visible:bg-background transition-colors"
      />
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted"
        disabled={disabled}
      >
        Buscar
      </Button>
    </Form>
  );
}
