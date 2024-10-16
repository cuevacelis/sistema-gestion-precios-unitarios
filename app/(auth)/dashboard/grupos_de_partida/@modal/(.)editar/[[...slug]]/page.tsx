import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import { obtenerNombreGruposDePartidasById } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { convertToStringOrNull } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

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
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <GetDataEditarGrupoPartida idGrupoPartida={lastSlug} />
      </Suspense>
    </Modal>
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
