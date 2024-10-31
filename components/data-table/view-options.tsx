"use client";

import React, { useCallback } from "react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Column, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import { useTableSearchParams } from "@/hooks/useTableSearchParams";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = React.useState(false);
  const { updateSearchParams } = useTableSearchParams(table);

  const getColumnTitle = useCallback((column: any) => {
    if (typeof column.columnDef.header === "function") {
      return column.columnDef.header({ column }).props.title;
    }
    return column.columnDef.header || column.id;
  }, []);

  const handleColumnVisibilityChange = useCallback(
    (column: Column<TData, unknown>, isVisible: boolean) => {
      column.toggleVisibility(isVisible);
      updateSearchParams("fshow", column.id, isVisible);
    },
    [updateSearchParams]
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          aria-label="Ver opciones de columna"
        >
          <Settings2 className="mr-2 h-4 w-4" />
          Columnas visibles
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="text-xs"
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  handleColumnVisibilityChange(column, value)
                }
              >
                {getColumnTitle(column)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
