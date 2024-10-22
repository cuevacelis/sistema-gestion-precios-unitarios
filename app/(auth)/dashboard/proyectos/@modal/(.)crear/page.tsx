import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import { obtenerClientes } from "@/lib/services/sql-queries";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const NuevoProyecto = dynamic(
  () => import("../../crear/_components/nuevo-proyecto"),
  {
    loading: () => <p>Cargando...</p>,
  }
);

export default async function NuevoProyectoModalPage() {
  return (
    <Modal title="Crear nuevo proyecto" classNameDialogContent="h-[500px]">
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
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
