"use client";
import { DataTablePagination } from "@/components/data-table/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import useUpdateTableComplete from "@/hooks/useTableComplete";
import { IDataDBGrupoDePartidas } from "@/lib/types";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { flexRender } from "@tanstack/react-table";
import { IProcedureResult } from "mssql";
import { columns } from "./columns-table";

interface IGrupoPartidas {
  dataGrupoDePartidas: IProcedureResult<IDataDBGrupoDePartidas>;
}

export default function GrupoPartidas(props: IGrupoPartidas) {
  const { table, rowSelection } = useUpdateTableComplete({
    data: props.dataGrupoDePartidas.recordset,
    rowCount: props.dataGrupoDePartidas.output.TotalRegistro,
    columns: columns,
    // identifierField: "NomGruPar_Nombre",
  });

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Grupo Partidas</h2>
      <div className="block">
        <Card x-chunk="overflow-auto">
          <CardContent>
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
          </CardContent>
          <CardFooter>
            <DataTablePagination table={table} rowSelection={rowSelection} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
