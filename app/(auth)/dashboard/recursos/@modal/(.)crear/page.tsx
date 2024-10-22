import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import {
  obtenerTipoRecurso,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const NuevoRecurso = dynamic(
  () => import("../../crear/_components/nuevo-recurso"),
  {
    loading: () => <p>Cargando...</p>,
  }
);

export default async function NuevoRecursoModalPage() {
  return (
    <Modal title="Crear nuevo recurso" classNameDialogContent="h-[500px]">
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <GetDataNuevoRecurso />
      </Suspense>
    </Modal>
  );
}

async function GetDataNuevoRecurso() {
  const dataUnidadesDeMedida = await obtenerUnidadesDeMedida();
  const dataTipoRecurso = await obtenerTipoRecurso();
  return (
    <NuevoRecurso
      dataUnidadesDeMedida={dataUnidadesDeMedida}
      dataTipoRecurso={dataTipoRecurso}
    />
  );
}
