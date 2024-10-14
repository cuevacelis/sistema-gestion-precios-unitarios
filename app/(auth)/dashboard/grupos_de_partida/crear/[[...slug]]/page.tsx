import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { obtenerProyectos } from "@/lib/services/sql-queries";
import { ISearchParams } from "@/lib/types/types";
import { convertToStringOrNull } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoGrupoPartida = dynamic(
  () => import("./_components/nuevo-grupo-partida"),
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

export default function NuevoGrupoPartidaPage({
  searchParams,
  params,
}: IPropsNuevoGrupoPartida) {
  const { proyectoId } = searchParams;
  const { slug = [] } = params;
  const lastSlug = slug.at(-1);
  const uniqueKey = `grupos-de-partida-crear-${proyectoId}-${lastSlug}`;

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
