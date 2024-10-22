import { Card, CardContent } from "@/components/ui/card";
import {
  obtenerGruposDePartidas,
  obtenerPartidaById,
  obtenerRecursos,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const AsignarRecursoPartida = dynamic(
  () => import("./_components/asignar-recurso"),
  {
    loading: () => <p>Cargando...</p>,
  }
);

interface IPropsAsignarRecursoPartida {
  params: Promise<{
    idPartida: string;
  }>;
}

export default async function AsignarRecursoPartidaPage(
  props: IPropsAsignarRecursoPartida
) {
  const params = await props.params;
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">Asignar recurso a partida</h1>
      <Card className="overflow-auto mb-6 pt-6">
        <CardContent>
          <Suspense key={params.idPartida} fallback={<p>Cargando...</p>}>
            <GetDataAsignarRecursoPartida idPartida={params.idPartida} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataAsignarRecursoPartida({
  idPartida,
}: {
  idPartida: string;
}) {
  const dataPartida = await obtenerPartidaById(Number(idPartida));
  if (dataPartida.length === 0) {
    return notFound();
  }
  const dataRecursos = await obtenerRecursos();
  return (
    <AsignarRecursoPartida
      dataPartida={dataPartida[0]}
      dataRecursos={dataRecursos}
    />
  );
}
