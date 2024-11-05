import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import { obtenerClientes } from "@/lib/services/sql-queries";
import { auth } from "@/auth";
import NuevoProyecto from "../../crear/_components/nuevo-proyecto";
import NuevoProyectoSkeleton from "../../crear/_components/skeleton";

export default async function NuevoProyectoModalPage() {
  return (
    <Modal title="Crear nuevo proyecto">
      <Suspense fallback={<NuevoProyectoSkeleton />}>
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
