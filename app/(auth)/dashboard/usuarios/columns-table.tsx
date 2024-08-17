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
import { IDataDBObtenerUsuariosPaginados } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<IDataDBObtenerUsuariosPaginados>[] = [
  {
    id: "Id",
    accessorKey: "Usu_Id",
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
    id: "Usu_Id",
    accessorKey: "Usu_Id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Usu_NomApellidos",
    accessorKey: "Usu_NomApellidos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Rol_Nombre",
    accessorKey: "Rol_Nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Usu_Correo",
    accessorKey: "Usu_Correo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Usu_Observacion",
    accessorKey: "Usu_Observacion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
  },
  {
    id: "Pre_FecHorRegistro",
    accessorKey: "Pre_FecHorRegistro",
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
    cell: ({}) => {
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
              <Link href={"/dashboard/presupuestos/1/editar"}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
