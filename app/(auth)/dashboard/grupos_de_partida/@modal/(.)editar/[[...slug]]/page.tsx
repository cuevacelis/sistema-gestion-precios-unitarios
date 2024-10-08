import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import ModalLoading from "@/components/ui/modal-loading";
import { obtenerNombreGruposDePartidasById } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";

const EditarGrupoPartida = dynamic(
  () => import("../../../editar/[[...slug]]/_components/editar-grupo-partida"),
  {
    ssr: false,
  }
);

interface IPropsEditarGruposDePartidaModalPage {
  params: {
    slug?: string[];
  };
}

export default function EditarGruposDePartidaModalPage({
  params,
}: IPropsEditarGruposDePartidaModalPage) {
  const { slug = [] } = params;
  const lastSlug = slug.at(-1);
  return (
    <Modal title="Editar grupo de partida">
      <Suspense fallback={<ModalLoading />}>
        <GetDataEditarGrupoPartida idGrupoPartida={String(lastSlug)} />
      </Suspense>
    </Modal>
  );
}

interface IParams {
  idGrupoPartida: string;
}

async function GetDataEditarGrupoPartida({ idGrupoPartida }: IParams) {
  const data = await obtenerNombreGruposDePartidasById(Number(idGrupoPartida));
  const nombreGrupoPartida = data?.grupar_nombre;

  return (
    <EditarGrupoPartida
      {...{
        idGrupoPartida,
        nombreGrupoPartida,
      }}
    />
  );
}
