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
import { IDataDBObtenerClientesPaginados } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<IDataDBObtenerClientesPaginados>[] = [
  {
    id: "Id",
    accessorKey: "Cli_Id",
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
    accessorKey: "Cli_Id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Cli_NomApeRazSocial",
    accessorKey: "Cli_NomApeRazSocial",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Cli_NumDocumento",
    accessorKey: "Cli_NumDocumento",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Cli_Abreviatura",
    accessorKey: "Cli_Abreviatura",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "TipDoc_Nombre",
    accessorKey: "TipDoc_Nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Pre_Estado",
    accessorKey: "Pre_Estado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`presupuestos/${row.original.Cli_Id}/editar`}>
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
