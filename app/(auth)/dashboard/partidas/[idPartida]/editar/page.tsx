import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import {
  obtenerClientes,
  obtenerGruposDePartidas,
  obtenerPartidaById,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditarPartida = dynamic(() => import("./_components/edit-partida"), {
  loading: () => <p>Cargando...</p>,
});

interface IPropsEditPartida {
  params: Promise<{
    idPartida: string;
  }>;
}

export default async function EditarPartidaPage(props: IPropsEditPartida) {
  const params = await props.params;
  return (
    <>
      <div className="block p-4 lg:p-6">
        <h1 className="text-lg font-semibold mb-6">Editar</h1>
        <Card x-chunk="overflow-auto" className="mb-6">
          <CardContent>
            <Suspense key={params.idPartida} fallback={<p>Cargando...</p>}>
              <GetDataEditarPartida idPartida={params.idPartida} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

async function GetDataEditarPartida({ idPartida }: { idPartida: string }) {
  const dataPartida = await obtenerPartidaById(Number(idPartida));
  if (dataPartida.length === 0) {
    return notFound();
  }
  const dataGruposDePartidas = await obtenerGruposDePartidas();
  const dataUnidadesDeMedida = await obtenerUnidadesDeMedida();

  return (
    <EditarPartida
      dataPartida={dataPartida[0]}
      dataGruposDePartidas={dataGruposDePartidas}
      dataUnidadesDeMedida={dataUnidadesDeMedida}
    />
  );
}
