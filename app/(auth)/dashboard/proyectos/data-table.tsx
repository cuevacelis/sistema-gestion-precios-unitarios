"use client";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IDataDBObtenerPresupuestosPaginados } from "@/lib/types";
import { IProcedureResult } from "mssql";
import { columns } from "./columns-table";
import { useTableContext } from "./context-table";

interface IProps {
  dataPresupuestos: IProcedureResult<IDataDBObtenerPresupuestosPaginados>;
}

export default function TableComponent(props: IProps) {
  const { table } = useTableContext({
    data: props.dataPresupuestos.recordset,
    columns: columns,
  });

  return (
    <>
      <Card x-chunk="overflow-auto">
        <CardContent>
          <DataTable table={table} />
        </CardContent>
        <CardFooter>
          <DataTablePagination
            table={table}
            serverPagination={{
              totalData: props.dataPresupuestos.output.TotalRegistro,
              totalPages: props.dataPresupuestos.output.TotalPagina,
            }}
          />
        </CardFooter>
      </Card>
    </>
  );
}
