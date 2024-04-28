import Search from "@/components/search/search";
import { obtenerPresupuestosPaginados } from "@/lib/data/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { TableProvider } from "./context-table";

const TableComponent = dynamic(() => import("./data-table"), { ssr: false });
const OptionsTable = dynamic(() => import("./options-table"), { ssr: false });

export default async function ProyectPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    rowsPerPage?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const elementsPerPage = Number(searchParams?.rowsPerPage) || 10;

  return (
    <TableProvider>
      <main className="block p-4 lg:p-6">
        <div className="flex items-center mb-6">
          <h1 className="text-lg font-semibold md:text-2xl">Proyectos</h1>
          <div className="ml-auto flex items-center gap-2">
            <Suspense
              key={query + currentPage + elementsPerPage}
              fallback={<p>cargando...</p>}
            >
              <GetDataOptionsTable
                {...{ query, currentPage, elementsPerPage }}
              />
            </Suspense>
          </div>
        </div>
        <Search className="mb-6" />
        <Suspense
          key={query + currentPage + elementsPerPage}
          fallback={<p>cargando...</p>}
        >
          <GetDataTable {...{ query, currentPage, elementsPerPage }} />
        </Suspense>
      </main>
    </TableProvider>
  );
}

async function GetDataTable(props: {
  query: string;
  currentPage: number;
  elementsPerPage: number;
}) {
  const dataPresupuestos = await obtenerPresupuestosPaginados(
    props.elementsPerPage,
    props.currentPage,
    props.query
  );
  return <TableComponent {...{ dataPresupuestos }} />;
}

async function GetDataOptionsTable(props: {
  query: string;
  currentPage: number;
  elementsPerPage: number;
}) {
  const dataPresupuestos = await obtenerPresupuestosPaginados(
    props.elementsPerPage,
    props.currentPage,
    props.query
  );
  return <OptionsTable {...{ dataPresupuestos }} />;
}
