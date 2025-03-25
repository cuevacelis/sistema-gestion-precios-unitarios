import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ISearchParams } from "@/lib/types/types";
import {
  obtenerNombreGruposDePartidasById,
  obtenerProyectos,
} from "@/lib/services/sql-queries";
import { Skeleton } from "@/components/ui/skeleton";
import { convertToStringOrNull } from "@/lib/utils";

const NuevoGrupoPartida = dynamic(
  () => import("../../../../crear/[[...slug]]/_components/nuevo-grupo-partida"),
  {}
);

interface IPropsNuevoGrupoPartida {
  searchParams: Promise<ISearchParams>;
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function NuevoGrupoPartidaModalPage(
  props: IPropsNuevoGrupoPartida
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { proyectoId } = searchParams;
  const { slug = [] } = params;
  const lastSlug = slug.at(-1);
  const isSubGroup = slug.length > 0;
  const uniqueKey = `grupos-de-partida-crear-modal-${proyectoId}-${lastSlug}-${isSubGroup}`;

  return (
    <Modal title="Crear nuevo grupo de partida">
      <Suspense key={uniqueKey} fallback={<Skeleton className="h-10 w-full" />}>
        <GetDataNuevoGrupoPartida
          idProyecto={proyectoId}
          lastSlug={lastSlug}
          isSubGroup={isSubGroup}
        />
      </Suspense>
    </Modal>
  );
}

interface IParams {
  idProyecto?: string | string[] | undefined;
  lastSlug?: string;
  isSubGroup: boolean;
}

async function GetDataNuevoGrupoPartida({
  idProyecto,
  lastSlug,
  isSubGroup,
}: IParams) {
  const dataProyectos = await obtenerProyectos();
  let idProyectoFinal: string | null;
  let dataGrupoPartida: Awaited<
    ReturnType<typeof obtenerNombreGruposDePartidasById>
  >;
  if (isSubGroup) {
    dataGrupoPartida = await obtenerNombreGruposDePartidasById(
      String(lastSlug)
    );
    idProyectoFinal = String(dataGrupoPartida?.pre_id);
  } else {
    idProyectoFinal = convertToStringOrNull(idProyecto);
  }

  return (
    <NuevoGrupoPartida
      idProyecto={idProyectoFinal}
      lastSlug={convertToStringOrNull(lastSlug)}
      dataProyectos={dataProyectos}
      isSubGroup={isSubGroup}
      dataGrupoPartidaParent={dataGrupoPartida}
    />
  );
}
