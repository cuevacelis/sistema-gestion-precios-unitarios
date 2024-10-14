import { Card, CardContent } from "@/components/ui/card";
import { obtenerNombreGruposDePartidasById } from "@/lib/services/sql-queries";
import { convertToStringOrNull } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const EditarGrupoPartida = dynamic(
  () => import("./_components/editar-grupo-partida"),
  {
    ssr: false,
  }
);

interface IPropsEditarGrupoPartida {
  params: {
    slug?: string[];
  };
}

export default function EditarGrupoPartidaPage({
  params,
}: IPropsEditarGrupoPartida) {
  const { slug = [] } = params;
  const lastSlug = slug.at(-1);

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">Editar Grupo de Partida</h1>
      <Card className="overflow-auto mb-6">
        <CardContent>
          <Suspense fallback={<p>Cargando...</p>}>
            <GetDataEditarGrupoPartida idGrupoPartida={lastSlug} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

interface IParams {
  idGrupoPartida?: string;
}

async function GetDataEditarGrupoPartida({ idGrupoPartida }: IParams) {
  const dataGrupoPartida = await obtenerNombreGruposDePartidasById(
    String(idGrupoPartida)
  );

  return (
    <EditarGrupoPartida
      idGrupoPartida={convertToStringOrNull(idGrupoPartida)}
      dataGrupoPartida={dataGrupoPartida}
    />
  );
}
