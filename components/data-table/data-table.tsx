"use client";

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableUI,
} from "@/components/ui/table";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Table, flexRender } from "@tanstack/react-table";

interface DataTableProps<TData> {
  table: Table<TData>;
}

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <TableUI>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <ContextMenu key={row.id}>
              <ContextMenuTrigger key={row.id} asChild>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuPrimitive.Portal>
                <ContextMenuPrimitive.Content className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                  <ContextMenuItem className="text-red-500">
                    Esta seccción aún esta en desarrollo
                  </ContextMenuItem>
                  <ContextMenuItem>Duplicar</ContextMenuItem>
                  <ContextMenuItem>Editar</ContextMenuItem>
                  <ContextMenuItem>Eliminar</ContextMenuItem>
                </ContextMenuPrimitive.Content>
              </ContextMenuPrimitive.Portal>
            </ContextMenu>
          ))
        ) : (
          <p>No existen datos disponibles.</p>
        )}
      </TableBody>
    </TableUI>
  );
}
