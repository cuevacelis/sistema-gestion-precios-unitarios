import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  obtenerClientes,
  obtenerGruposDePartidasPaginados,
  obtenerUbicacion,
} from "@/lib/data/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoProyecto = dynamic(() => import("./nuevo-proyecto"), { ssr: false });
const GrupoPartidas = dynamic(() => import("./grupo-partidas"), { ssr: false });

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
        <h1 className="text-lg font-semibold mb-6">Nuevo Proyecto</h1>
        <Card x-chunk="overflow-auto">
          <CardContent>
            <Suspense fallback={<p>cargando...</p>}>
              <GetDataNuevoProyecto />
            </Suspense>
            <Separator className="my-10" />

            <Suspense
              key={query + currentPage + rowsPerPage}
              fallback={<p>cargando...</p>}
            >
              <GetDataGrupoPartidas {...{ query, currentPage, rowsPerPage }} />
            </Suspense>
          </CardContent>
        </Card>

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
  const dataUbicacion = await obtenerUbicacion();
  const dataClientes = await obtenerClientes();
  return <NuevoProyecto {...{ dataUbicacion, dataClientes }} />;
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
  return <GrupoPartidas {...{ dataGrupoDePartidas }} />;
}
