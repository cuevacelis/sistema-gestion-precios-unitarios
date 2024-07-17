"use client";
import { Button } from "@/components/ui/button";
import { useGetGestionPresupuestos } from "@/context/context-presupuestos";
import { IDataDBObtenerPresupuestosPaginados } from "@/lib/types";
import { File, PlusCircle } from "lucide-react";
import { IProcedureResult } from "mssql";
import Link from "next/link";

interface IProps {
  dataPresupuestos: IProcedureResult<IDataDBObtenerPresupuestosPaginados>;
}

export default function OptionsTable() {
  const { table, rowSelection, setRowSelection } = useGetGestionPresupuestos(
    {}
  );

  return (
    <>
      <Button size="sm" variant="outline" className="h-8 gap-1">
        <File className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Exportarff
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
