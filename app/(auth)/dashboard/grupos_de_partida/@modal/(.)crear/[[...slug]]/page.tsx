import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ISearchParams } from "@/lib/types/types";
import { obtenerProyectos } from "@/lib/services/sql-queries";
import { Skeleton } from "@/components/ui/skeleton";
import { convertToStringOrNull } from "@/lib/utils";

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
  const { proyectoId } = searchParams;
  const { slug = [] } = params;
  const lastSlug = slug.at(-1);
  const uniqueKey = `grupos-de-partida-crear-modal-${proyectoId}-${lastSlug}`;

  return (
    <Modal title="Crear nuevo grupo de partida">
      <Suspense key={uniqueKey} fallback={<Skeleton className="h-10 w-full" />}>
        <GetDataNuevoGrupoPartida idProyecto={proyectoId} lastSlug={lastSlug} />
      </Suspense>
    </Modal>
  );
}

interface IParams {
  idProyecto?: string | string[] | undefined;
  lastSlug?: string;
}

async function GetDataNuevoGrupoPartida({ idProyecto, lastSlug }: IParams) {
  const dataProyectos = await obtenerProyectos();
  return (
    <NuevoGrupoPartida
      idProyecto={convertToStringOrNull(idProyecto)}
      lastSlug={convertToStringOrNull(lastSlug)}
      dataProyectos={dataProyectos}
    />
  );
}
