import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import ModalLoading from "@/components/ui/modal-loading";
import { obtenerClientes } from "@/lib/services/sql-queries";
import { auth } from "@/auth";
import dynamic from "next/dynamic";

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
      <Suspense fallback={<ModalLoading />}>
        <GetDataNuevoPartida />
      </Suspense>
    </Modal>
  );
}

async function GetDataNuevoPartida() {
  return <NuevoPartida />;
}
