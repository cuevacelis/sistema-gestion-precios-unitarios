import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  obtenerGruposDePartidasIdProyecto,
  obtenerGruposDePartidasIdRecursive,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";

const TableComponent = dynamic(() => import("../_components/data-table"), {
  ssr: false,
  loading: () => (
    <section className="min-h-[600px] flex justify-center items-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8" />
    </section>
  ),
});

const OptionsTable = dynamic(() => import("../_components/options-table"), {
  ssr: false,
  loading: () => <Skeleton className="h-4 min-w-20" />,
});

interface IGruposDePartidaPage {
  params: {
    idProyecto: string;
    slug?: string[];
  };
}

export default async function GruposDePartidaPage({
  params,
}: IGruposDePartidaPage) {
  const { idProyecto, slug = [] } = params;

  let gruposDePartidas;
  if (slug.length === 0) {
    gruposDePartidas = await obtenerGruposDePartidasIdProyecto(
      Number(idProyecto)
    );
  } else {
    const lastGrupoPartidaId = Number(slug[slug.length - 1]);
    gruposDePartidas = await obtenerGruposDePartidasIdRecursive(
      Number(idProyecto),
      lastGrupoPartidaId
    );
  }

  // if (gruposDePartidas.length === 0) {
  //   return notFound();
  // }

  return (
    <>
      <section className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl flex flex-row gap-2 items-center">
          Grupos de Partidas
        </h1>
      </section>
      <section className="flex items-center flex-wrap gap-3 bg-card p-4 rounded-sm border shadow">
        <Suspense fallback={<Skeleton className="h-4 min-w-20" />}>
          <OptionsTable />
        </Suspense>
      </section>
      <section className="bg-card p-4 rounded-sm border shadow">
        <TableComponent
          dataGruposDePartidas={gruposDePartidas}
          idProyecto={idProyecto}
          currentPath={[idProyecto, ...slug]}
        />
      </section>
    </>
  );
}
