import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoGrupoPartida = dynamic(
  () => import("./_components/nuevo-grupo-partida"),
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

export default function NuevoGrupoPartidaPage({
  params,
}: IPropsNuevoGrupoPartida) {
  const { idProyecto, slug = [] } = params;
  const lastSlug = slug.at(-1);

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Crear Nuevo Grupo de Partida
      </h1>
      <Card className="overflow-auto mb-6">
        <CardContent>
          <Suspense fallback={<p>Cargando...</p>}>
            <GetDataNuevoGrupoPartida
              idProyecto={idProyecto}
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
