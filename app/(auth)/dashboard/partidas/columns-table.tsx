"use client";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IDataDBObtenerPresupuestosPaginados } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<IDataDBObtenerPresupuestosPaginados>[] = [
  {
    id: "Id",
    accessorKey: "Pre_Id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          console.log(value);
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
    accessorKey: "Pre_Codigo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Usuario",
    accessorKey: "Usu_NomApellidos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Nombre",
    accessorKey: "Pre_Nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Razón social",
    accessorKey: "Cli_NomApeRazSocial",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Jornal",
    accessorKey: "Pre_Jornal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Fecha",
    accessorKey: "Pre_FecHorRegistro",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(String(payment.pre_codigo))
              }
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/dashboard/presupuestos/1/editar"}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
