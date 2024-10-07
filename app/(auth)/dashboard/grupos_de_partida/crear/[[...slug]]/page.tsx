import { Card, CardContent } from "@/components/ui/card";
import { ISearchParams } from "@/lib/types";
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
  const proyectoId = searchParams.proyectoId;
  const { slug = [] } = params;
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
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Crear Nuevo Grupo de Partida
      </h1>
      <Card className="overflow-auto mb-6">
        <CardContent>
          <Suspense fallback={<p>Cargando...</p>}>
            <GetDataNuevoGrupoPartida
              idProyecto={String(proyectoId)}
              lastSlug={lastSlug}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
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
