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
import { IDataDBObtenerGruposDePartidasId, ISearchParams } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  searchParams: ISearchParams;
  params: {
    slug?: string[];
  };
}

export default async function GruposDePartidaSubgruposPage({
  searchParams,
  params,
}: IGruposDePartidaPage) {
  const { slug = [] } = params;
  const isSubGroup = slug.length > 0;
  const lastGrupoPartidaId = Number(slug[slug.length - 1]);
  const proyectoId = searchParams.proyectoId;
  const uniqueKey = `table-grupos-de-partida-${proyectoId}-${slug.join("-")}`;

  if (!proyectoId) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Parámetro faltante</AlertTitle>
            <AlertDescription>
              Falta el parámetro &#39;proyectoId&#39;. Por favor, asegúrate de
              incluirlo en la URL.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
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
                      key={uniqueKey}
                      fallback={<span>Loading...</span>}
                    >
                      <GrupoPartidaNameById
                        idGrupoPartida={lastGrupoPartidaId}
                      />
                    </Suspense>
                  ) : (
                    <Suspense
                      key={uniqueKey}
                      fallback={<span>Loading...</span>}
                    >
                      <PresupuestoNameById idPresupuesto={Number(proyectoId)} />
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
            key={uniqueKey}
            fallback={<Skeleton className="h-10 w-full" />}
          >
            <OptionsTableData
              isSubGroup={isSubGroup}
              idProyecto={String(proyectoId)}
              lastGrupoPartidaId={lastGrupoPartidaId}
            />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Suspense key={uniqueKey} fallback={<TableSkeleton />}>
            <TableWrapper
              isSubGroup={isSubGroup}
              idProyecto={String(proyectoId)}
              lastGrupoPartidaId={lastGrupoPartidaId}
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

interface OptionsTableDataProps {
  isSubGroup: boolean;
  idProyecto: string;
  lastGrupoPartidaId: number;
}

async function OptionsTableData({
  isSubGroup,
  idProyecto,
  lastGrupoPartidaId,
}: OptionsTableDataProps) {
  let gruposDePartidas: IDataDBObtenerGruposDePartidasId[] = [];
  let isPartidasAssigned: boolean = false;

  if (isSubGroup) {
    gruposDePartidas = await obtenerGruposDePartidasIdRecursive(
      Number(idProyecto),
      lastGrupoPartidaId
    );
    isPartidasAssigned =
      await obtenerIsPartidasDeGrupoPartidaId(lastGrupoPartidaId);
  } else {
    gruposDePartidas = await obtenerGruposDePartidasIdProyecto(
      Number(idProyecto)
    );
  }
  return (
    <OptionsTable
      isTheLastChildInTheListGrupoPartida={gruposDePartidas.length === 0}
      isPartidasAssigned={isPartidasAssigned}
      lastGrupoPartidaId={lastGrupoPartidaId}
    />
  );
}

interface TableWrapperProps {
  isSubGroup: boolean;
  idProyecto: string;
  lastGrupoPartidaId: number;
}

async function TableWrapper({
  isSubGroup,
  idProyecto,
  lastGrupoPartidaId,
}: TableWrapperProps) {
  let gruposDePartidas: IDataDBObtenerGruposDePartidasId[] = [];
  let isPartidasAssigned: boolean = false;

  if (isSubGroup) {
    gruposDePartidas = await obtenerGruposDePartidasIdRecursive(
      Number(idProyecto),
      lastGrupoPartidaId
    );
    isPartidasAssigned =
      await obtenerIsPartidasDeGrupoPartidaId(lastGrupoPartidaId);
  } else {
    gruposDePartidas = await obtenerGruposDePartidasIdProyecto(
      Number(idProyecto)
    );
  }

  return (
    <TableComponent
      dataGruposDePartidas={gruposDePartidas}
      isPartidasAssigned={isPartidasAssigned}
      lastGrupoPartidaId={lastGrupoPartidaId}
    />
  );
}
