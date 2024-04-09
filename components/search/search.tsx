"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export default function Search({ placeholder }: { placeholder: string }) {
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

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Buscador
      </label>
      <Input
        // classNames={{
        //   base: "max-w-full h-10",
        //   mainWrapper: "h-full",
        //   input: "text-small",
        //   inputWrapper:
        //     "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        // }}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // startContent={<SearchIcon size={18} />}
        type="search"
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
