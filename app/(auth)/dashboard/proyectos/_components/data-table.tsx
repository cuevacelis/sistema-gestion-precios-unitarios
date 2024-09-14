"use client";

import { useMemo, useState, useCallback } from "react";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import ModalConfirmacionComponent from "@/components/modals/modalConfirmacion/modalConfirmacion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/components/ui/context-menu";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableUI,
} from "@/components/ui/table";
import ValidateMutation from "@/components/validate/validateMutation";
import { useSetGestionProyectos } from "@/context/context-proyectos";
import { actionsDeletePresupuesto } from "@/lib/actions";
import {
  IDataDBObtenerProyectosPaginados,
  ISpPresupuestoObtenPaginado,
  TStatusResponseActions,
} from "@/lib/types";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Trash2, Copy, FileEdit, PlusCircle } from "lucide-react";
import Link from "next/link";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import useUpdateTableComplete from "@/hooks/useTableComplete";

interface IProps {
  dataProyectos: ISpPresupuestoObtenPaginado[];
}

export default function TableComponent({ dataProyectos }: IProps) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [rowSelected, setRowSelected] =
    useState<IDataDBObtenerProyectosPaginados | null>(null);
  const [statusRespDeletePresupuesto, setStatusRespDeletePresupuesto] =
    useState<TStatusResponseActions>("idle");

  const columns: ColumnDef<IDataDBObtenerProyectosPaginados>[] = useMemo(
    () => [
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <Checkbox
      //       checked={
      //         table.getIsAllPageRowsSelected() ||
      //         (table.getIsSomePageRowsSelected() && "indeterminate")
      //       }
      //       onCheckedChange={(value) =>
      //         table.toggleAllPageRowsSelected(!!value)
      //       }
      //       aria-label="Seleccionar todos"
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       checked={row.getIsSelected()}
      //       onCheckedChange={(value) => row.toggleSelected(!!value)}
      //       aria-label={`Seleccionar fila ${row.index + 1}`}
      //     />
      //   ),
      //   enableSorting: false,
      //   enableHiding: false,
      // },
      {
        accessorKey: "pre_codigo",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Código" />
        ),
      },
      {
        accessorKey: "usu_nomapellidos",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Usuario" />
        ),
      },
      {
        accessorKey: "pre_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nombre" />
        ),
      },
      {
        accessorKey: "cli_nomaperazsocial",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Razón social" />
        ),
      },
      {
        accessorKey: "pre_jornal",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Jornal" />
        ),
      },
      {
        accessorKey: "pre_fechorregistro",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Fecha" />
        ),
      },
    ],
    []
  );

  // const {
  //   dataTable: { table, rowSelection, setRowSelection },
  // } = useSetGestionProyectos({
  //   identifierField: "pre_id",
  //   data: dataProyectos[0].result.data,
  //   columns,
  //   rowCount: dataProyectos[0].result.meta.total_registro,
  // });

  const { table, rowSelection, setRowSelection } = useUpdateTableComplete({
    data: dataProyectos[0].result.data,
    columns,
    rowCount: dataProyectos[0].result.meta.total_registro,
    identifierField: "pre_id",
  });

  const handleDeselectAll = () => {
    setRowSelection({});
  };

  const handleDeleteConfirm = async () => {
    if (!rowSelected) return;
    setStatusRespDeletePresupuesto("pending");
    await actionsDeletePresupuesto(rowSelected.pre_id);
    setStatusRespDeletePresupuesto("success");
    setIsShowDeleteModal(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <ValidateMutation statusMutation={[statusRespDeletePresupuesto]}>
      <div className="relative mb-6 flex flex-row gap-2 items-center">
        {/* <Button
          onClick={handleDeselectAll}
          variant="outline"
          className="btn btn-secondary"
          size="sm"
        >
          Deseleccionar Todo
        </Button> */}
        <DataTableViewOptions table={table} />
      </div>
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
              {table.getRowModel().rows.map((row) => (
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
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
                  <ContextMenuContent className="w-64">
                    <ContextMenuItem
                      onClick={() =>
                        handleCopyCode(String(row.original.pre_codigo))
                      }
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Copiar: {row.original.pre_codigo}</span>
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicar</span>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`proyectos/${row.original.pre_id}/grupos-de-partida`}
                        className="flex items-center"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Grupos de Partida</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        href={`proyectos/${row.original.pre_id}/editar`}
                        className="flex items-center"
                      >
                        <FileEdit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </Link>
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => {
                        setRowSelected(row.original);
                        setIsShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </TableBody>
          </TableUI>
        </CardContent>
        <CardFooter className="pt-2">
          <DataTablePagination table={table} rowSelection={rowSelection} />
        </CardFooter>
      </Card>
      {isShowDeleteModal && (
        <ModalConfirmacionComponent
          title="¿Está seguro de eliminar el presupuesto?"
          show={isShowDeleteModal}
          onClose={() => setIsShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
        />
      )}
    </ValidateMutation>
  );
}
