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
    (filterName: string, columnId: string, isVisible: boolean) => {
      const newParams = new URLSearchParams(searchParams.toString());
      const visibleColumnIds = getVisibleColumnIds();

      if (isVisible) {
        visibleColumnIds.add(columnId);
      } else {
        visibleColumnIds.delete(columnId);
      }

      newParams.delete(filterName);
      visibleColumnIds.forEach((id) => newParams.append(filterName, id));

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, getVisibleColumnIds, router, pathname]
  );

  return { updateSearchParams };
}
