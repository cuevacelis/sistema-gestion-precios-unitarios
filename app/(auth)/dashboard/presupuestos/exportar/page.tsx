import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerPresupuestosPaginados } from "@/lib/services/sql-queries";
import { ISpPresupuestoObtenPaginado } from "@/lib/types";
import { ExportButton } from "./_components/export-button";

interface IPropsNuevoProyecto {
  searchParams?: {
    query?: string;
    page?: string;
    rowsPerPage?: string;
  };
}

export default function ExportarPage(props: IPropsNuevoProyecto) {
  return (
    <div className="block p-4 lg:p-6">
      <h1 className="text-lg font-semibold">Exportar</h1>
      <p className="mt-1 mb-6 text-sm leading-6 text-gray-600">
        Haga clic en el botón para generar y descargar el archivo Excel.
      </p>
      <Card x-chunk="overflow-auto" className="mb-6">
        <CardContent>
          <Suspense fallback={<p>Cargando...</p>}>
            <GetDataExportar />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataExportar() {
  const dataPresupuestos = await obtenerPresupuestosPaginados(100, 1, "");

  const formatHeadersExcel = (data: ISpPresupuestoObtenPaginado[]) => {
    return data[0].result.data.map((object) => ({
      Código: object.pre_codigo || "",
      Usuario: object.usu_nomapellidos,
      Nombre: object.pre_nombre,
      "Razón social": object.cli_nomaperazsocial,
      Jornal: object.pre_jornal,
      Fecha: object.pre_fechorregistro,
    }));
  };

  const formattedData = formatHeadersExcel(dataPresupuestos);

  return <ExportButton data={formattedData} />;
}
