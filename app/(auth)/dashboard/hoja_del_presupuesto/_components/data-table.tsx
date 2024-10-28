"use client";

import { useMemo, useEffect, Fragment } from "react";
import { Cell, ColumnDef, flexRender } from "@tanstack/react-table";
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

interface IProps {
  dataPresupuesto: ISpHojaDePresupuesto["result"]["data"];
}

export default function HojaDePresupuestoTable({ dataPresupuesto }: IProps) {
  const totalResults = dataPresupuesto?.length;

  const colorStyles = {
    level1: "text-red-600", // Primer nivel (proyectos)
    level2: "text-blue-600", // Segundo nivel (grupos de partidas)
    level3: "text-blue-800", // Tercer nivel (partidas)
    lastLevel: "text-white", // Último nivel (cuando no tiene más hijos)
  };

  useEffect(() => {
    console.log(dataPresupuesto);
  }, [dataPresupuesto]);

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

  const renderPartidasRows = (
    row: any,
    parentItemNumber: string,
    level: number,
    visibilityRows: Cell<ISpHojaDePresupuesto["result"]["data"][0], any>[]
  ) => {
    return row.grupos_partida?.map((partida: any, partidaIndex: number) => {
      const partidaItemNumber = generateItemNumber(
        partidaIndex,
        1,
        parentItemNumber
      );

      return (
        <Fragment key={`partida-${partida.grupar_id}-${partidaIndex}`}>
          {/* Grupos de partida con color dependiendo del nivel */}
          <TableRow
            key={partida.grupar_id}
            className={
              colorStyles[
                `level${Math.min(level + 1, 3)}` as keyof typeof colorStyles
              ]
            }
          >
            <TableCell className="border-r">{partidaItemNumber}</TableCell>
            <TableCell className="pl-4 border-r">
              <strong>{partida.grupar_nombre}</strong>
            </TableCell>
            {visibilityRows.slice(2).map((cell) => (
              <TableCell key={cell.id} className="border-r"></TableCell>
            ))}
          </TableRow>

          {/* Subpartidas en el nivel 3 o más */}
          {partida.grupos_hijos?.map(
            (subpartida: any, subpartidaIndex: number) => {
              const subpartidaItemNumber = generateItemNumber(
                subpartidaIndex,
                2,
                partidaItemNumber
              );

              // Si no hay más hijos en el nivel 4, usar color blanco
              const subpartidaClass = !subpartida.grupos_hijos
                ? colorStyles.lastLevel // Último nivel
                : colorStyles.level3; // Nivel 3 si aún tiene hijos

              return (
                <TableRow
                  key={subpartida.grupar_id}
                  className={subpartidaClass}
                >
                  <TableCell className="border-r">
                    {subpartidaItemNumber}
                  </TableCell>
                  <TableCell className="pl-8 border-r">
                    {subpartida.grupar_nombre}
                    {subpartida.grupar_total}
                  </TableCell>
                  {visibilityRows.slice(2).map((cell) => (
                    <TableCell key={cell.id} className="border-r"></TableCell>
                  ))}
                </TableRow>
              );
            }
          )}
        </Fragment>
      );
    });
  };

  const columns: ColumnDef<ISpHojaDePresupuesto["result"]["data"][0]>[] =
    useMemo(
      () => [
        {
          accessorKey: "item",
          header: "Item",
          cell: ({ row, table }) =>
            generateItemNumber(table?.getRowModel()?.rows.indexOf(row), 0),
        },
        {
          accessorKey: "pre_nombre",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Nombre del Proyecto"
              hideSort
            />
          ),
          cell: ({ row }) => row.original.pre_nombre.toUpperCase(),
        },
        {
          accessorKey: "usu_nomapellidos",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Usuario" hideSort />
          ),
          cell: ({ row }) => row.original.usu_nomapellidos,
        },
        {
          accessorKey: "cli_nomaperazsocial",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Razón Social"
              hideSort
            />
          ),
          cell: ({ row }) => row.original.cli_nomaperazsocial,
        },
        {
          accessorKey: "pre_fechorregistro",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Fecha de Creación"
              hideSort
            />
          ),
          cell: ({ row }) =>
            formatDateToDateTimeWith12HourFormat(
              row.original.pre_fechorregistro
            ),
        },
      ],
      []
    );

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

  if (!table || !table?.getRowModel()?.rows.length) {
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
                    <TableHead key={header.id} className="border-r">
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
              {table?.getRowModel()?.rows.map((row, rowIndex) => {
                const itemNumber = generateItemNumber(rowIndex, 0);
                const visibilityRows = row.getVisibleCells();
                return (
                  <Fragment key={`filas-${row.id}-${rowIndex}`}>
                    {/* Fila principal del proyecto en rojo */}
                    <TableRow key={row.id} className={colorStyles.level1}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="border-r">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {/* Renderizar las partidas como nuevas filas */}
                    {renderPartidasRows(
                      row.original,
                      itemNumber,
                      1,
                      visibilityRows
                    )}
                  </Fragment>
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
