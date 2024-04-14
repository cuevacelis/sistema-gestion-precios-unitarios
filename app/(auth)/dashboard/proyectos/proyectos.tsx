"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { File, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Payment, columns } from "./columns";

const dataTable: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "success",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "a@example.com",
  },
];

export default function ProyectosComponent() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Proyectos</h1>
        <div className="ml-auto flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Exportar
            </span>
          </Button>
          <Button asChild size="sm" className="h-8 gap-1">
            <Link href={"/dashboard/proyectos/crear"}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Añadir
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0 overflow-auto">
        <CardContent>
          <DataTable columns={columns} data={dataTable} table={table} />
        </CardContent>
        <CardFooter>
          <DataTablePagination
            table={table}
            serverPagination={{
              totalData: 100,
              totalPages: 10,
            }}
          />
        </CardFooter>
      </Card>
    </>
  );
}
