import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISearchParams } from "@/lib/types/types";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import { auth } from "@/auth";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { obtenerRecursosPaginados } from "@/lib/services/sql-queries";

const BackButtonHistory = dynamic(
  () => import("@/components/back-button/back-button-history"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-9" />,
  }
);

const Search = dynamic(() => import("@/components/search/search"), {
  ssr: false,
  loading: () => <></>,
});

const OptionsTable = dynamic(() => import("./_components/options-table"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full" />,
});

const TableComponent = dynamic(() => import("./_components/data-table"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

interface IProjectPage {
  searchParams: ISearchParams;
}

export default async function ProyectPage({ searchParams }: IProjectPage) {
  const session = await auth();
  const { page, rowsPerPage, query, grupoPartidaId } = searchParams;
  const uniqueKey = `table-recursos-${grupoPartidaId}-${page}-${rowsPerPage}-${query}`;

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
                  modNombre="Recurso"
                />
                Recursos
              </CardTitle>
            </div>
            <Search
              placeholder="Buscar recursos..."
              className="w-full sm:w-64 lg:w-96"
              disabled={true}
            />
          </div>
        </CardHeader>
      </Card>

      <Card className="p-6">
        <CardContent className="px-0 py-0">
          <Suspense
            key={uniqueKey}
            fallback={<Skeleton className="h-10 w-full" />}
          >
            <OptionsTable session={session} />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Suspense key={uniqueKey} fallback={<TableSkeleton />}>
            <GetDataTable searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataTable({ searchParams }: { searchParams: ISearchParams }) {
  const dataRecursos = await obtenerRecursosPaginados();
  return <TableComponent dataRecursos={dataRecursos} />;
}
