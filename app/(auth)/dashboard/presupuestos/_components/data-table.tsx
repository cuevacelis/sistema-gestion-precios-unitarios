"use client";
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
import { useSetGestionPresupuestos } from "@/context/context-presupuestos";
import { actionsDeletePresupuesto } from "@/lib/actions";
import {
  IDataDBObtenerPresupuestosPaginados,
  ISpPresupuestoObtenPaginado,
  TStatusResponseActions,
} from "@/lib/types";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface IProps {
  dataPresupuestos: ISpPresupuestoObtenPaginado[];
}

export default function TableComponent(props: IProps) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [rowSelected, setRowSelected] =
    useState<IDataDBObtenerPresupuestosPaginados>();
  const [statusRespDeletePresupuesto, setStatusRespDeletePresupuesto] =
    useState<TStatusResponseActions>("idle");
  const columns: ColumnDef<IDataDBObtenerPresupuestosPaginados>[] = useMemo(
    () => [
      {
        id: "Id",
        accessorKey: "pre_id",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              return table.toggleAllPageRowsSelected(!!value);
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "Código",
        accessorKey: "pre_codigo",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={column.id} />
        ),
      },
      {
        id: "Usuario",
        accessorKey: "usu_nomapellidos",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={column.id} />
        ),
      },
      {
        id: "Nombre",
        accessorKey: "pre_nombre",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={column.id} />
        ),
      },
      {
        id: "Razón social",
        accessorKey: "cli_nomaperazsocial",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={column.id} />
        ),
      },
      {
        id: "Jornal",
        accessorKey: "pre_jornal",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={column.id} />
        ),
      },
      {
        id: "Fecha",
        accessorKey: "pre_fechorregistro",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={column.id} />
        ),
      },
    ],
    []
  );
  const {
    dataTable: { table, rowSelection, setRowSelection },
  } = useSetGestionPresupuestos({
    identifierField: "Pre_Id",
    data: props.dataPresupuestos[0].result.data,
    columns,
    rowCount: props.dataPresupuestos[0].result.meta.total_registro,
  });

  return (
    <ValidateMutation statusMutation={[statusRespDeletePresupuesto]}>
      <div className="mb-6 flex flex-row gap-2 items-center">
        <Button
          onClick={() => {
            setRowSelection({});
          }}
          variant="outline"
          className="btn btn-secondary"
          size="sm"
        >
          Deseleccionar Todo
        </Button>
        <DataTableViewOptions table={table} />
      </div>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
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
              {table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => (
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
                          <ContextMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                String(row.original.pre_codigo)
                              )
                            }
                          >
                            Copiar: {row.original.pre_codigo}
                          </ContextMenuItem>
                          <ContextMenuItem className="cursor-pointer">
                            Duplicar
                          </ContextMenuItem>
                          <ContextMenuItem asChild className="cursor-pointer">
                            <Link
                              href={`presupuestos/${row.original.pre_id}/editar`}
                            >
                              Editar
                            </Link>
                          </ContextMenuItem>
                          <ContextMenuItem asChild>
                            <Button
                              size="default"
                              variant="destructive"
                              className="cursor-pointer h-9 gap-1 w-full justify-start"
                              onClick={() => {
                                setRowSelected(row.original);
                                setIsShowDeleteModal(true);
                              }}
                            >
                              <Trash2 className="w-4" />
                              <span>Eliminar</span>
                            </Button>
                          </ContextMenuItem>
                        </ContextMenuPrimitive.Content>
                      </ContextMenuPrimitive.Portal>
                    </ContextMenu>
                  ))
                : null}
            </TableBody>
          </TableUI>
        </CardContent>
        <CardFooter className="pt-2">
          <DataTablePagination table={table} rowSelection={rowSelection} />
        </CardFooter>
      </Card>
      {isShowDeleteModal && (
        <ModalConfirmacionComponent
          show={isShowDeleteModal}
          onClose={() => setIsShowDeleteModal(false)}
          onConfirm={async () => {
            if (!rowSelected) {
              return;
            }
            setStatusRespDeletePresupuesto("pending");
            const actionsDeletePresupuestoWithId =
              actionsDeletePresupuesto.bind(null, rowSelected.pre_id);
            await actionsDeletePresupuestoWithId();
            setStatusRespDeletePresupuesto("success");
            setIsShowDeleteModal(false);
          }}
          classNameButtonAction="bg-destructive text-white hover:bg-destructive/80"
        />
      )}
    </ValidateMutation>
  );
}
