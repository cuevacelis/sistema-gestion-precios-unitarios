"use client";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch.flush();
    }
  };

  return (
    <div className={cn("relative ml-auto flex-1 md:grow-0", className)}>
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        autoFocus
        autoComplete="on"
        type="search"
        placeholder={placeholder || "Busqueda..."}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg bg-background pl-8 shadow"
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
