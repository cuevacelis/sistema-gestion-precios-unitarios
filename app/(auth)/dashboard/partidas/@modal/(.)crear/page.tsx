import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import {
  obtenerGruposDePartidas,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";

const NuevoPartida = dynamic(
  () => import("../../crear/_components/nueva-partida"),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

export default async function NuevoPartidaModalPage() {
  return (
    <Modal title="Crear nuevo partida" classNameDialogContent="h-[500px]">
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <GetDataNuevoPartida />
      </Suspense>
    </Modal>
  );
}

async function GetDataNuevoPartida() {
  const dataGruposDePartidas = await obtenerGruposDePartidas();
  const dataUnidadesDeMedida = await obtenerUnidadesDeMedida();
  return (
    <NuevoPartida
      dataGruposDePartidas={dataGruposDePartidas}
      dataUnidadesDeMedida={dataUnidadesDeMedida}
    />
  );
}
