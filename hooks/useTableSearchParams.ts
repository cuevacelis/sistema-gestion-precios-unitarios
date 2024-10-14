"use client";

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Table } from "@tanstack/react-table";

export function useTableSearchParams<TData>(table: Table<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getVisibleColumnIds = useCallback(() => {
    return new Set(
      table
        .getAllColumns()
        .filter((column) => column.getIsVisible())
        .map((column) => column.id)
    );
  }, [table]);

  const updateSearchParams = useCallback(
    (keySearchParam: string, columnId: string, isVisible: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      const visibleColumnIds = getVisibleColumnIds();

      if (isVisible) {
        visibleColumnIds.add(columnId);
      } else {
        visibleColumnIds.delete(columnId);
      }

      // Convertimos el Set a un array y lo ordenamos alfabéticamente
      const sortedColumnIds = Array.from(visibleColumnIds).sort();

      params.delete(keySearchParam);
      sortedColumnIds.forEach((id) => params.append(keySearchParam, id));

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, getVisibleColumnIds, router, pathname]
  );

  return { updateSearchParams };
}
