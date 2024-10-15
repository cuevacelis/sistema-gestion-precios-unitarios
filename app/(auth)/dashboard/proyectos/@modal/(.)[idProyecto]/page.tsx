import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import { obtenerProyectoDetalle } from "@/lib/services/sql-queries";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const VerDetalleProyecto = dynamic(
  () => import("../../[idProyecto]/_components/detalle-proyecto"),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

interface IPropsEditProyectoModalPage {
  params: {
    idProyecto: string;
  };
}

export default function VerDetalleProyectoModalPage({
  params,
}: IPropsEditProyectoModalPage) {
  const { idProyecto } = params;
  return (
    <Modal title="Ver detalle proyecto" classNameDialogContent="h-[500px]">
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <GetDataVerDetalleProyecto idProyecto={idProyecto} />
      </Suspense>
    </Modal>
  );
}

async function GetDataVerDetalleProyecto({
  idProyecto,
}: {
  idProyecto: string;
}) {
  const dataDetalleProyecto = await obtenerProyectoDetalle(Number(idProyecto));
  if (!dataDetalleProyecto) {
    return notFound();
  }
  return <VerDetalleProyecto dataDetalleProyecto={dataDetalleProyecto} />;
}
