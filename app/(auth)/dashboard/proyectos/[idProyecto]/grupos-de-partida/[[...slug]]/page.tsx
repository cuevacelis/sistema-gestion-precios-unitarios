import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  obtenerGruposDePartidasIdProyecto,
  obtenerGruposDePartidasIdRecursive,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";

const BackButtonHistory = dynamic(
  () => import("@/components/back-button/back-button-history"),
  {
    ssr: false,
  }
);

const OptionsTable = dynamic(() => import("../_components/options-table"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full" />,
});

const TableComponent = dynamic(() => import("../_components/data-table"), {
  ssr: false,
  loading: () => <TableSkeleton />,
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
    <div className="space-y-6">
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <BackButtonHistory />
              <CardTitle className="text-2xl font-bold flex items-center">
                <Layers className="mr-2 h-8 w-8" />
                Grupos de Partida
              </CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="p-6">
        <CardContent className="px-0 py-0">
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <OptionsTable />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Suspense fallback={<TableSkeleton />}>
            <TableComponent
              dataGruposDePartidas={gruposDePartidas}
              idProyecto={idProyecto}
              currentPath={[idProyecto, ...slug]}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
