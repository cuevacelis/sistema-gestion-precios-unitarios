import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import ModalLoading from "@/components/ui/modal-loading";
import dynamic from "next/dynamic";
import { ISearchParams } from "@/lib/types";

const NuevoGrupoPartida = dynamic(
  () => import("../../../crear/[[...slug]]/_components/nuevo-grupo-partida"),
  {
    ssr: false,
  }
);

interface IPropsNuevoGrupoPartida {
  searchParams: ISearchParams;
  params: {
    slug?: string[];
  };
}

export default async function NuevoProyectoModalPage({
  searchParams,
  params,
}: IPropsNuevoGrupoPartida) {
  const { slug = [] } = params;
  const proyectoId = searchParams.proyectoId;
  const lastSlug = slug.at(-1);

  if (!proyectoId) {
    return (
      <div className="p-4 lg:p-6">
        <h1 className="text-2xl font-semibold mb-4">Crear Grupo de Partida</h1>
        <p className="text-muted-foreground">
          Falta el parámetro &#39;proyectoId&#39;. Por favor, asegúrate de
          incluirlo en la URL.
        </p>
      </div>
    );
  }

  return (
    <Modal title="Crear nuevo grupo de partida">
      <Suspense fallback={<ModalLoading />}>
        <GetDataNuevoGrupoPartida
          idProyecto={String(proyectoId)}
          lastSlug={lastSlug}
        />
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
