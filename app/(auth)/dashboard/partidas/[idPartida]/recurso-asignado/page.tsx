import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  obtenerAsignacionesRecursoToPartida,
  obtenerPartidaById,
  obtenerRecursos,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const VerRecursoPartida = dynamic(() => import("./_components/data-table"), {
  loading: () => <p>Cargando...</p>,
});

const OptionsTable = dynamic(() => import("./_components/options-table"), {
  loading: () => <p>Cargando...</p>,
});

interface IPropsVerRecursoPartida {
  params: Promise<{
    idPartida: string;
  }>;
}

export default async function VerRecursoPartidaPage(
  props: IPropsVerRecursoPartida
) {
  const params = await props.params;
  const { idPartida } = params;
  const uniqueKey = `Ver-recurso-partida-${idPartida}`;
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Ver recursos de la partida
      </h1>
      <Card className="p-6">
        <CardContent className="px-0 py-0">
          <Suspense
            key={uniqueKey}
            fallback={<Skeleton className="h-10 w-full" />}
          >
            <OptionsTable idPartida={idPartida} />
          </Suspense>
        </CardContent>
      </Card>
      <Card className="overflow-auto mb-6 pt-6">
        <CardContent>
          <Suspense key={uniqueKey} fallback={<p>Cargando...</p>}>
            <GetDataVerRecursoPartida idPartida={idPartida} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataVerRecursoPartida({ idPartida }: { idPartida: string }) {
  const dataPartida = await obtenerPartidaById(Number(idPartida));
  const dataPartidaRecursosAsignados =
    await obtenerAsignacionesRecursoToPartida(Number(idPartida));
  if (dataPartida.length === 0) {
    return notFound();
  }
  const dataRecursos = await obtenerRecursos();
  return (
    <VerRecursoPartida
      dataPartida={dataPartida[0]}
      dataRecursos={dataRecursos}
      dataPartidaRecursosAsignados={dataPartidaRecursosAsignados}
    />
  );
}
