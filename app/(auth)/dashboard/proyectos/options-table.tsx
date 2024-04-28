"use client";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import { Button } from "@/components/ui/button";
import { IDataDBObtenerPresupuestosPaginados } from "@/lib/types";
import { File, PlusCircle } from "lucide-react";
import { IProcedureResult } from "mssql";
import Link from "next/link";
import { columns } from "./columns-table";
import { useTableContext } from "./context-table";

interface IProps {
  dataPresupuestos: IProcedureResult<IDataDBObtenerPresupuestosPaginados>;
}

export default function OptionsTable(props: IProps) {
  const table = useTableContext({
    data: props.dataPresupuestos.recordset,
    columns: columns,
  });

  return (
    <>
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
    </>
  );
}
