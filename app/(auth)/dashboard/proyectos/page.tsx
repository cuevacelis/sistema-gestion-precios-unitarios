import { Skeleton } from "@/components/ui/skeleton";
import { obtenerProyectosPaginados } from "@/lib/services/sql-queries";
import { ISearchParams } from "@/lib/types";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TableComponent = dynamic(() => import("./_components/data-table"), {
  ssr: false,
  loading: () => (
    <section className="min-h-[600px] flex justify-center items-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8" />
    </section>
  ),
});
const Search = dynamic(() => import("@/components/search/search"), {
  ssr: true,
  loading: () => <p>Loading search...</p>,
});
const OptionsTable = dynamic(() => import("./_components/options-table"), {
  ssr: false,
  loading: () => <Skeleton className="h-4 min-w-20" />,
});

interface IProjectPage {
  searchParams: ISearchParams;
}

export default async function ProyectPage({ searchParams }: IProjectPage) {
  const query = String(searchParams.query || "");
  const currentPage = Number(searchParams.page) || 1;
  const rowsPerPage = Number(searchParams.rowsPerPage) || 10;

  return (
    <>
      <section className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl flex flex-row gap-2 items-center">
          Proyectos
        </h1>
      </section>
      <section className="flex items-center flex-wrap gap-3 bg-card p-4 rounded-sm border shadow">
        <Suspense
          key={query + currentPage + rowsPerPage}
          fallback={<Skeleton className="h-4 min-w-20" />}
        >
          <OptionsTable />
        </Suspense>
      </section>
      <Search className="my-6" />
      <section className="bg-card p-4 rounded-sm border shadow">
        <Suspense
          key={query + currentPage + rowsPerPage}
          fallback={
            <section className="min-h-[600px] flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8" />
            </section>
          }
        >
          <GetDataTable {...{ query, currentPage, rowsPerPage }} />
        </Suspense>
      </section>
    </>
  );
}

async function GetDataTable(props: {
  query: string;
  currentPage: number;
  rowsPerPage: number;
}) {
  const dataProyectos = await obtenerProyectosPaginados(
    props.rowsPerPage,
    props.currentPage,
    props.query
  );
  return <TableComponent {...{ dataProyectos }} />;
}
