import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  obtenerNombreGruposDePartidasById,
  obtenerProyectos,
} from "@/lib/services/sql-queries";
import { ISearchParams } from "@/lib/types/types";
import { convertToStringOrNull } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoGrupoPartida = dynamic(
  () => import("./_components/nuevo-grupo-partida"),
  {}
);

interface IPropsNuevoGrupoPartida {
  searchParams: Promise<ISearchParams>;
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function NuevoGrupoPartidaPage(
  props: IPropsNuevoGrupoPartida
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { proyectoId } = searchParams;
  const { slug = [] } = params;
  const lastSlug = slug.at(-1);
  const isSubGroup = slug.length > 0;
  const uniqueKey = `grupos-de-partida-crear-${proyectoId}-${lastSlug}-${isSubGroup}`;

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Crear Nuevo Grupo de Partida
      </h1>
      <Card className="overflow-auto mb-6">
        <CardContent>
          <Suspense
            key={uniqueKey}
            fallback={<Skeleton className="h-10 w-full" />}
          >
            <GetDataNuevoGrupoPartida
              idProyecto={proyectoId}
              lastSlug={lastSlug}
              isSubGroup={isSubGroup}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
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
