import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  obtenerClientes,
  obtenerCountries,
  obtenerDepartments,
  obtenerDistricts,
  obtenerGruposDePartidasPaginados,
  obtenerProvinces,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoProyecto = dynamic(() => import("./_components/nuevo-proyecto"), {
  ssr: false,
});
const GrupoPartidas = dynamic(() => import("./_components/grupo-partidas"), {
  ssr: false,
});

interface IPropsNuevoProyecto {
  searchParams?: {
    query?: string;
    page?: string;
    rowsPerPage?: string;
  };
}

export default function NuevoProyectoPage(props: IPropsNuevoProyecto) {
  const query = props.searchParams?.query || "";
  const currentPage = Number(props.searchParams?.page) || 1;
  const rowsPerPage = Number(props.searchParams?.rowsPerPage) || 10;

  return (
    <>
      <div className="block p-4 lg:p-6">
        <h1 className="text-lg font-semibold">Crear</h1>
        <p className="mt-1 mb-6 text-sm leading-6 text-gray-600">
          Bienvenido a la sección de creación de nuevos registros. Aquí puedes
          añadir un nuevo registro a nuestra base de datos de manera rápida y
          sencilla. Por favor, completa todos los campos obligatorios con la
          información correspondiente.
        </p>
        <Card x-chunk="overflow-auto" className="mb-6">
          <CardContent>
            <Suspense fallback={<p>cargando...</p>}>
              <GetDataNuevoProyecto />
            </Suspense>
          </CardContent>
        </Card>

        <Suspense
          key={query + currentPage + rowsPerPage}
          fallback={<p>cargando...</p>}
        >
          <GetDataGrupoPartidas {...{ query, currentPage, rowsPerPage }} />
        </Suspense>

        <div className="mt-6 flex justify-end">
          <div className="flex flex-row gap-2 items-center">
            <label>Presupuesto</label>
            <Input type="text" readOnly value="Calcular desde partidas..." />
          </div>
        </div>
      </div>
    </>
  );
}

async function GetDataNuevoProyecto() {
  const dataClientes = await obtenerClientes();
  const session = await auth();
  return (
    <NuevoProyecto
      {...{
        dataClientes,
        session,
      }}
    />
  );
}

async function GetDataGrupoPartidas(props: {
  query: string;
  currentPage: number;
  rowsPerPage: number;
}) {
  const dataGrupoDePartidas = await obtenerGruposDePartidasPaginados(
    props.rowsPerPage,
    props.currentPage,
    props.query
  );
  // return <GrupoPartidas {...{ dataGrupoDePartidas }} />;
  return null;
}
