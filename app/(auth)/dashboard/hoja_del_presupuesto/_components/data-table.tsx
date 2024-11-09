"use client";

import { useMemo, useEffect, Fragment } from "react";
import { Cell, ColumnDef, CoreRow, flexRender } from "@tanstack/react-table";
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
import {
  IDataDBObtenerHojaDePresupuestoId,
  TDataGrupoPartidaDBObtenerHojaDePresupuestoId,
} from "@/lib/types/types";
import useUpdateTableComplete from "@/hooks/useTableComplete";

interface IProps {
  dataHojaDePresupuesto: IDataDBObtenerHojaDePresupuestoId["result"]["data"];
}

export default function HojaDePresupuestoTable({
  dataHojaDePresupuesto,
}: IProps) {
  const dataGruposPartidasByHojaDePresupuesto =
    dataHojaDePresupuesto[0]?.grupos_partida || [];
  const totalResults = dataHojaDePresupuesto[0]?.grupos_partida?.length;

  const colorStyles = {
    level1: "text-red-600", // Primer nivel (proyectos)
    level2: "text-blue-600", // Segundo nivel (grupos de partidas)
    level3: "text-blue-800", // Tercer nivel (partidas)
    lastLevel: "text-white", // Último nivel (cuando no tiene más hijos)
  };

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
    row: CoreRow<TDataGrupoPartidaDBObtenerHojaDePresupuestoId>,
    parentItemNumber: string,
    level: number,
    visibilityRows: Cell<TDataGrupoPartidaDBObtenerHojaDePresupuestoId, any>[]
  ) => {
    return row.original.grupos_hijos?.map((gp, partidaIndex: number) => {
      const partidaItemNumber = generateItemNumber(
        partidaIndex,
        1,
        parentItemNumber
      );

      return (
        <Fragment key={`gp-${gp.grupar_id}-${partidaIndex}`}>
          {/* Grupos de partida con color dependiendo del nivel */}
          <TableRow
            key={gp.grupar_id}
            className={
              colorStyles[
                `level${Math.min(level + 1, 3)}` as keyof typeof colorStyles
              ]
            }
          >
            <TableCell className="border-r">{partidaItemNumber}</TableCell>
            <TableCell className="pl-4 border-r">
              <strong>{gp.grupar_nombre}</strong>
            </TableCell>
            {visibilityRows.slice(2).map((cell) => (
              <TableCell key={cell.id} className="border-r"></TableCell>
            ))}
          </TableRow>

          {gp?.partidas?.map((partida, subpartidaIndex: number) => {
            const subpartidaItemNumber = generateItemNumber(
              subpartidaIndex,
              2,
              partidaItemNumber
            );

            const subpartidaClass = !true
              ? colorStyles.lastLevel // Último nivel
              : colorStyles.level3; // Nivel 3 si aún tiene hijos

            return (
              <TableRow key={partida.par_id} className={subpartidaClass}>
                <TableCell className="border-r">
                  {subpartidaItemNumber}
                </TableCell>
                <TableCell className="pl-8 border-r">
                  {partida.par_nombre}
                  {partida.par_preunitario}
                </TableCell>
                {visibilityRows.slice(2).map((cell) => (
                  <TableCell key={cell.id} className="border-r"></TableCell>
                ))}
              </TableRow>
            );
          })}
        </Fragment>
      );
    });
  };

  const columns: ColumnDef<TDataGrupoPartidaDBObtenerHojaDePresupuestoId>[] =
    useMemo(
      () => [
        {
          accessorKey: "item",
          header: "Item",
          cell: ({ row, table }) =>
            generateItemNumber(table?.getRowModel()?.rows.indexOf(row), 0),
        },
        {
          accessorKey: "nombre",
          header: "Nombre",
          cell: ({ row }) => row.original.grupar_nombre.toUpperCase(),
        },
        {
          accessorKey: "UnidadMedida",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Unidad de Medida"
              hideSort
            />
          ),
        },
        {
          accessorKey: "precio",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Precio S/."
              hideSort
            />
          ),
        },
      ],
      []
    );

  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: dataGruposPartidasByHojaDePresupuesto,
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
                    {renderPartidasRows(row, itemNumber, 1, visibilityRows)}
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
