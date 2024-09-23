import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import ModalLoading from "@/components/ui/modal-loading";
import { obtenerClientes } from "@/lib/services/sql-queries";
import { auth } from "@/auth";
import dynamic from "next/dynamic";

const NuevoProyecto = dynamic(
  () => import("../../crear/_components/nuevo-proyecto"),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

export default async function NuevoProyectoModalPage() {
  return (
    <Modal title="Crear nuevo proyecto">
      <Suspense fallback={<ModalLoading />}>
        <GetDataNuevoProyecto />
      </Suspense>
    </Modal>
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
