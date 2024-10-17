"use client";

import { useMemo, useState, useEffect } from "react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableUI,
} from "@/components/ui/table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTablePagination } from "@/components/data-table/pagination";
import { formatDateToDateTimeWith12HourFormat } from "@/lib/utils";
import { ISpHojaDePresupuesto } from "@/lib/types/types";
import useUpdateTableComplete from "@/hooks/useTableComplete";

// Definir las props
interface IProps {
  dataPresupuesto: ISpHojaDePresupuesto["result"]["data"];
}

export default function HojaDePresupuestoTable({ dataPresupuesto }: IProps) {
  const totalResults = dataPresupuesto.length;

  // Log para inspeccionar dataPresupuesto
  useEffect(() => {
    console.log(dataPresupuesto);
  }, [dataPresupuesto]);

  // Generar el número de ítem de forma dinámica
  const generateItemNumber = (
    index: number,
    level: number,
    parentItemNumber: string | null = null
  ) => {
    const currentNumber = (index + 1).toString().padStart(2, "0"); // Formato 01, 02, 03, etc.
    return parentItemNumber
      ? `${parentItemNumber}.${currentNumber}`
      : currentNumber;
  };

  // Función para renderizar las partidas y subpartidas como filas separadas
  const renderPartidasRows = (row: any, parentItemNumber: string) => {
    return row.grupos_partida?.map((partida: any, partidaIndex: number) => {
      const partidaItemNumber = generateItemNumber(
        partidaIndex,
        1,
        parentItemNumber
      );

      return (
        <>
          {/* Grupos de partida en azul */}
          <TableRow key={partida.grupar_id} className="text-blue-600">
            <TableCell>{partidaItemNumber}</TableCell>
            <TableCell colSpan={4} className="pl-4">
              <strong>{partida.grupar_nombre}</strong> - Total:{" "}
              {partida.grupar_total}
            </TableCell>
          </TableRow>
          {partida.grupos_hijos &&
            partida.grupos_hijos.map(
              (subpartida: any, subpartidaIndex: number) => {
                const subpartidaItemNumber = generateItemNumber(
                  subpartidaIndex,
                  2,
                  partidaItemNumber
                );
                return (
                  <TableRow key={subpartida.grupar_id}>
                    <TableCell>{subpartidaItemNumber}</TableCell>
                    <TableCell colSpan={4} className="pl-8">
                      {subpartida.grupar_nombre} - Total:{" "}
                      {subpartida.grupar_total}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
        </>
      );
    });
  };

  // Definir las columnas
  const columns: ColumnDef<ISpHojaDePresupuesto["result"]["data"][0]>[] =
    useMemo(
      () => [
        {
          accessorKey: "item",
          header: "Item",
          cell: ({ row, table }) =>
            generateItemNumber(table.getRowModel().rows.indexOf(row), 0), // Proyecto raíz
        },
        {
          accessorKey: "pre_nombre",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Nombre del Proyecto"
            />
          ),
          cell: ({ row }) => row.original.pre_nombre,
        },
        {
          accessorKey: "usu_nomapellidos",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Usuario" />
          ),
          cell: ({ row }) => row.original.usu_nomapellidos,
        },
        {
          accessorKey: "cli_nomaperazsocial",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Razón Social" />
          ),
          cell: ({ row }) => row.original.cli_nomaperazsocial,
        },
        {
          accessorKey: "pre_fechorregistro",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fecha de Creación" />
          ),
          cell: ({ row }) =>
            formatDateToDateTimeWith12HourFormat(
              row.original.pre_fechorregistro
            ),
        },
      ],
      []
    );

  // Configurar la tabla para manejar filas anidadas
  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: dataPresupuesto,
    columns,
    rowCount: totalResults,
    identifierField: "pre_id",
    initialState: {
      columnVisibility: {
        item: true,
        pre_codigo: true,
        pre_nombre: true,
        usu_nomapellidos: true,
        cli_nomaperazsocial: true,
        pre_fechorregistro: true,
      },
    },
  });

  if (!table || !table.getRowModel().rows.length) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <TableUI>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row, rowIndex) => {
                const itemNumber = generateItemNumber(rowIndex, 0); // Proyecto raíz
                return (
                  <>
                    {/* Fila principal del proyecto en rojo */}
                    <TableRow key={row.id} className="text-red-600">
                      <TableCell>{itemNumber}</TableCell>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {/* Renderizar las partidas como nuevas filas */}
                    {renderPartidasRows(row.original, itemNumber)}
                  </>
                );
              })}
            </TableBody>
          </TableUI>
        </CardContent>
        <CardFooter className="pt-2">
          <DataTablePagination table={table} rowSelection={rowSelection} />
        </CardFooter>
      </Card>
    </div>
  );
}
