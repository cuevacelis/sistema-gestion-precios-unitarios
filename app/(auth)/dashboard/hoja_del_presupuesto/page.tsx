import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISearchParams } from "@/lib/types/types";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import { auth } from "@/auth";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import {
  obtenerHojaDePresupuesto,
  obtenerHojaDePresupuestoByProyectoId,
  obtenerProyectos,
} from "@/lib/services/sql-queries";
import Link from "next/link";
import { convertToStringOrNull } from "@/lib/utils";

const BackButtonHistory = dynamic(
  () => import("@/components/back-button/back-button-history"),
  {
    loading: () => <Skeleton className="h-9 w-9" />,
  }
);

const DataDropdownProyectos = dynamic(
  () => import("./_components/data-dropdown-proyectos"),
  {
    loading: () => <Skeleton className="h-10 w-full" />,
  }
);

const OptionsTable = dynamic(() => import("./_components/options-table"), {
  loading: () => <Skeleton className="h-10 w-full" />,
});

const TableComponent = dynamic(() => import("./_components/data-table"), {
  loading: () => <TableSkeleton />,
});

interface IProjectPage {
  searchParams: Promise<ISearchParams>;
}

export default async function HojaDelPresupuestoPage(props: IProjectPage) {
  const searchParams = await props.searchParams;
  const { proyectoId } = searchParams;
  const uniqueKey = `table-hojaDelPresupuesto-${proyectoId}`;

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
                  modNombre="hoja de presupuesto"
                />
                Hoja de Presupuesto
              </CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="p-6">
        <CardContent className="px-0 py-0">
          <Suspense
            key={"options" + uniqueKey}
            fallback={<Skeleton className="h-10 w-full" />}
          >
            <GetDataOptions proyectoId={convertToStringOrNull(proyectoId)} />
          </Suspense>
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardContent className="px-0 py-0">
          <Suspense
            key={"dropdown" + uniqueKey}
            fallback={<Skeleton className="h-10 w-full" />}
          >
            <GetDataDropdownByProyectoId
              proyectoId={convertToStringOrNull(proyectoId)}
            />
          </Suspense>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <Suspense key={"table" + uniqueKey} fallback={<TableSkeleton />}>
            <GetDataTable searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataOptions({ proyectoId }: { proyectoId: string | null }) {
  const session = await auth();
  return <OptionsTable session={session} proyectoId={proyectoId} />;
}

async function GetDataTable({ searchParams }: { searchParams: ISearchParams }) {
  const { proyectoId } = searchParams;

  if (!proyectoId || proyectoId === "null") {
    return (
      <section className="flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">
          Aún no se ha seleccionado un proyecto
        </h1>
        <Link
          href="/dashboard/proyectos"
          className="underline underline-offset-4 flex items-center"
        >
          <ModuleIconsComponent
            className="mr-2 h-4 w-4 flex-shrink-0"
            modNombre="Proyecto"
          />
          Ver proyectos
        </Link>
      </section>
    );
  }

  const dataHojaDelPresupuesto = await obtenerHojaDePresupuestoByProyectoId(
    String(proyectoId)
  );

  return (
    <TableComponent
      dataHojaDePresupuesto={dataHojaDelPresupuesto[0]?.result?.data || []}
    />
  );
}

async function GetDataDropdownByProyectoId({
  proyectoId,
}: {
  proyectoId: string | null;
}) {
  const dataProyectos = await obtenerProyectos();

  return (
    <DataDropdownProyectos
      dataProyectos={dataProyectos}
      proyectoId={proyectoId}
    />
  );
}
