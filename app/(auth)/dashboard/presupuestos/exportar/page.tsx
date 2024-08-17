import exportToExcelWithColor from "@/components/export/exportToExcelWithColor";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerPresupuestosPaginados } from "@/lib/services/sql-queries";
import { IDataDBObtenerPresupuestosPaginados } from "@/lib/types";
import { IRecordSet } from "mssql";
import { Suspense } from "react";

interface IPropsNuevoProyecto {
  searchParams?: {
    query?: string;
    page?: string;
    rowsPerPage?: string;
  };
}

export default function NuevoProyectoPage(props: IPropsNuevoProyecto) {
  return (
    <>
      <div className="block p-4 lg:p-6">
        <h1 className="text-lg font-semibold">Exportar</h1>
        <p className="mt-1 mb-6 text-sm leading-6 text-gray-600">
          El archivo se generará en formato xlsx.
          <br /> La descarga se realizará automáticamente cuando se complete la
          exportación.
          <br /> Espere un momento mientras se genera el archivo.
        </p>
        <Card x-chunk="overflow-auto" className="mb-6">
          <CardContent>
            <Suspense fallback={<p>cargando...</p>}>
              <GetDataExportar />
            </Suspense>
          </CardContent>
        </Card>

        {/* <Suspense
          key={query + currentPage + rowsPerPage}
          fallback={<p>cargando...</p>}
        >
          <GetDataGrupoPartidas {...{ query, currentPage, rowsPerPage }} />
        </Suspense> */}
      </div>
    </>
  );
}

async function GetDataExportar() {
  const dataPresupuestos = await obtenerPresupuestosPaginados(100, 1, "");
  const formatHeadersExcel = (
    data: IRecordSet<IDataDBObtenerPresupuestosPaginados>
  ) => {
    const formatted = data.map((object) => {
      return {
        Código: object.pre_codigo,
        Usuario: object.usu_nomapellidos,
        Nombre: object.pre_nombre,
        "Razón social": object.cli_nomaperazsocial,
        Jornal: object.pre_jornal,
        Fecha: object.pre_fechorregistro,
      };
    });
    return formatted;
  };

  // await exportToExcelWithColor(
  //   formatHeadersExcel(dataPresupuestos.recordset),
  //   "Listado_de_Proyectos",
  //   "Datos"
  // );

  return <></>;
}
