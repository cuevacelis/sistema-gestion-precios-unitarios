import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import ModalLoading from "@/components/ui/modal-loading";
import dynamic from "next/dynamic";

const NuevoGrupoPartida = dynamic(
  () => import("../../../crear/[[...slug]]/_components/nuevo-grupo-partida"),
  {
    ssr: false,
  }
);

interface IPropsNuevoGrupoPartida {
  params: {
    idProyecto: string;
    slug?: string[];
  };
}

export default async function NuevoProyectoModalPage({
  params,
}: IPropsNuevoGrupoPartida) {
  const { idProyecto, slug = [] } = params;
  const lastSlug = slug.at(-1);

  return (
    <Modal title="Crear nuevo grupo de partida">
      <Suspense fallback={<ModalLoading />}>
        <GetDataNuevoGrupoPartida idProyecto={idProyecto} lastSlug={lastSlug} />
      </Suspense>
    </Modal>
  );
}

interface IParams {
  idProyecto: string;
  lastSlug?: string;
}

async function GetDataNuevoGrupoPartida({ idProyecto, lastSlug }: IParams) {
  return (
    <NuevoGrupoPartida
      {...{
        idProyecto,
        lastSlug,
      }}
    />
  );
}
