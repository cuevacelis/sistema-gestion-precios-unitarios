import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import {
  obtenerGruposDePartidas,
  obtenerPartidaById,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const EditarPartida = dynamic(
  () => import("../../../../[idPartida]/editar/_components/edit-partida"),
  {
    loading: () => <p>Cargando...</p>,
  }
);

interface IPropsEditPartidaModalPage {
  params: Promise<{
    idPartida: string;
  }>;
}

export default async function EditarPartidaModalPage(
  props: IPropsEditPartidaModalPage
) {
  const params = await props.params;
  return (
    <Modal title="Editar partida">
      <Suspense
        key={params.idPartida}
        fallback={<Skeleton className="h-10 w-full" />}
      >
        <GetDataEditarPartida idPartida={params.idPartida} />
      </Suspense>
    </Modal>
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
