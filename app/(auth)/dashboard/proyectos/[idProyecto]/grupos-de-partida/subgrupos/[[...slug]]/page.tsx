import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  obtenerGruposDePartidasIdProyecto,
  obtenerGruposDePartidasIdRecursive,
  obtenerNombreGruposDePartidasById,
  obtenerNombrePresupuestosById,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";

const BackButtonHistory = dynamic(
  () => import("@/components/back-button/back-button-history"),
  {
    ssr: false,
  }
);

const OptionsTable = dynamic(() => import("../../_components/options-table"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full" />,
});

const TableComponent = dynamic(() => import("../../_components/data-table"), {
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
  let isSubGroup = false;
  let lastGrupoPartidaId = 0;
  let isChildrenLastGrupoPartida = false;
  let gruposDePartidas;

  if (slug.length === 0) {
    isSubGroup = false;
    gruposDePartidas = await obtenerGruposDePartidasIdProyecto(
      Number(idProyecto)
    );
  } else {
    isSubGroup = true;
    lastGrupoPartidaId = Number(slug[slug.length - 1]);
    gruposDePartidas = await obtenerGruposDePartidasIdRecursive(
      Number(idProyecto),
      lastGrupoPartidaId
    );
    isChildrenLastGrupoPartida = gruposDePartidas.length === 0;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <BackButtonHistory />
              <CardTitle className="text-2xl font-bold flex items-center">
                <ModuleIconsComponent
                  className="mr-2 h-8 w-8 flex-shrink-0"
                  modNombre="Grupos de Partida"
                />
                <p className="">
                  Grupos de Partida{" "}
                  {isSubGroup ? (
                    <Suspense
                      key={lastGrupoPartidaId}
                      fallback={<span>Loading...</span>}
                    >
                      <GrupoPartidaNameById
                        idGrupoPartida={lastGrupoPartidaId}
                      />
                    </Suspense>
                  ) : (
                    <Suspense
                      key={idProyecto}
                      fallback={<span>Loading...</span>}
                    >
                      <PresupuestoNameById idPresupuesto={Number(idProyecto)} />
                    </Suspense>
                  )}
                </p>
              </CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="p-6">
        <CardContent className="px-0 py-0">
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <OptionsTable
              isChildrenLastGrupoPartida={isChildrenLastGrupoPartida}
            />
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

async function GrupoPartidaNameById({
  idGrupoPartida,
}: {
  idGrupoPartida: number;
}) {
  const data = await obtenerNombreGruposDePartidasById(idGrupoPartida);

  if (!data) {
    return null;
  }

  return (
    <>
      del grupo{" "}
      <span className="text-muted-foreground">
        &quot;{data.grupar_nombre}&quot;
      </span>
    </>
  );
}

async function PresupuestoNameById({
  idPresupuesto,
}: {
  idPresupuesto: number;
}) {
  const data = await obtenerNombrePresupuestosById(idPresupuesto);

  if (!data) {
    return null;
  }

  return (
    <>
      del proyecto{" "}
      <span className="text-muted-foreground">
        &quot;{data.pre_nombre}&quot;
      </span>
    </>
  );
}
