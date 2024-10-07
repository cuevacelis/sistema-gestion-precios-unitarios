import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import ModalLoading from "@/components/ui/modal-loading";
import {
  obtenerClientes,
  obtenerPartidaById,
} from "@/lib/services/sql-queries";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import dynamic from "next/dynamic";

const EditarPartida = dynamic(
  () => import("../../../[idPartida]/editar/_components/edit-partida"),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

interface IPropsEditPartidaModalPage {
  params: {
    idPartida: string;
  };
}

export default function EditarPartidaModalPage(
  props: IPropsEditPartidaModalPage
) {
  return (
    <Modal title="Editar partida" classNameDialogContent="h-[500px]">
      <Suspense fallback={<ModalLoading />}>
        <GetDataEditarPartida id={props.params.idPartida} />
      </Suspense>
    </Modal>
  );
}

async function GetDataEditarPartida(props: { id: string }) {
  const dataEditPresupuesto = await obtenerPartidaById(Number(props.id));
  if (dataEditPresupuesto.length === 0) {
    return notFound();
  }
  return <EditarPartida data={dataEditPresupuesto[0]} />;
}
