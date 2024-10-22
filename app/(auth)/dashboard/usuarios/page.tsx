import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISearchParams } from "@/lib/types/types";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import { auth } from "@/auth";
import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";

const BackButtonHistory = dynamic(
  () => import("@/components/back-button/back-button-history"),
  {
    loading: () => <Skeleton className="h-9 w-9" />,
  }
);

const Search = dynamic(() => import("@/components/search/search"), {
  loading: () => <></>,
});

const OptionsTable = dynamic(() => import("./_components/options-table"), {
  loading: () => <Skeleton className="h-10 w-full" />,
});

// const TableComponent = dynamic(() => import("./_components/data-table"), {
//   loading: () => <TableSkeleton />,
// });

interface IProjectPage {
  searchParams: Promise<ISearchParams>;
}

export default async function ProyectPage(props: IProjectPage) {
  const searchParams = await props.searchParams;
  const session = await auth();
  const query = String(searchParams.query || "");
  const currentPage = Number(searchParams.page) || 1;
  const rowsPerPage =
    Number(searchParams.rowsPerPage) ||
    Number(process.env.NEXT_PUBLIC_DEFAULT_ROWS_PER_PAGE!);

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
                  modNombre="Usuario"
                />
                Usuarios
              </CardTitle>
            </div>
            <Search
              placeholder="Buscar usuarios..."
              className="w-full sm:w-64 lg:w-96"
            />
          </div>
        </CardHeader>
      </Card>

      <Card className="p-6">
        <CardContent className="px-0 py-0">
          <Suspense
            key={`options-usuario-${query}-${currentPage}-${rowsPerPage}`}
            fallback={<Skeleton className="h-10 w-full" />}
          >
            <OptionsTable session={session} />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          {/* <Suspense
            key={`table-usuario-${query}-${currentPage}-${rowsPerPage}`}
            fallback={<TableSkeleton />}
          >
            <GetDataTable
              query={query}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
            />
          </Suspense> */}
        </CardContent>
      </Card>
    </div>
  );
}

// async function GetDataTable(props: {
//   query: string;
//   currentPage: number;
//   rowsPerPage: number;
// }) {
//   const dataUsuarios = await obtenerUsuariosPaginados(
//     props.rowsPerPage,
//     props.currentPage,
//     props.query
//   );
//   return <TableComponent dataUsuarios={dataUsuarios} />;
// }
