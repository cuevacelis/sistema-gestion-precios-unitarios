import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  obtenerGruposDePartidasIdProyecto,
  obtenerGruposDePartidasIdRecursive,
  obtenerIsPartidasDeGrupoPartidaId,
  obtenerNombreGruposDePartidasById,
  obtenerNombrePresupuestosById,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { IDataDBObtenerGruposDePartidasId } from "@/lib/types";

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
  let isPartidasDeGrupoPartidaId: boolean = false;

  if (slug.length > 0) {
    isSubGroup = true;
    lastGrupoPartidaId = Number(slug[slug.length - 1]);
    isPartidasDeGrupoPartidaId =
      await obtenerIsPartidasDeGrupoPartidaId(lastGrupoPartidaId);
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
          <Suspense
            key={lastGrupoPartidaId}
            fallback={<Skeleton className="h-10 w-full" />}
          >
            <OptionsTable
              isChildrenLastGrupoPartida={isChildrenLastGrupoPartida}
              isPartidasDeGrupoPartidaId={isPartidasDeGrupoPartidaId}
            />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Suspense key={lastGrupoPartidaId} fallback={<TableSkeleton />}>
            <TableWrapper
              idProyecto={idProyecto}
              slug={slug}
              lastGrupoPartidaId={lastGrupoPartidaId}
              isPartidasDeGrupoPartidaId={isPartidasDeGrupoPartidaId}
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

interface TableWrapperProps {
  idProyecto: string;
  slug: string[];
  lastGrupoPartidaId: number;
  isPartidasDeGrupoPartidaId: boolean;
}

async function TableWrapper({
  idProyecto,
  slug,
  lastGrupoPartidaId,
  isPartidasDeGrupoPartidaId,
}: TableWrapperProps) {
  let gruposDePartidas: IDataDBObtenerGruposDePartidasId[] = [];

  if (slug.length === 0) {
    gruposDePartidas = await obtenerGruposDePartidasIdProyecto(
      Number(idProyecto)
    );
  } else {
    gruposDePartidas = await obtenerGruposDePartidasIdRecursive(
      Number(idProyecto),
      lastGrupoPartidaId
    );
  }

  return (
    <TableComponent
      dataGruposDePartidas={gruposDePartidas}
      idProyecto={idProyecto}
      currentPath={[idProyecto, ...slug]}
      isPartidasDeGrupoPartidaId={isPartidasDeGrupoPartidaId}
      lastGrupoPartidaId={lastGrupoPartidaId}
    />
  );
}
