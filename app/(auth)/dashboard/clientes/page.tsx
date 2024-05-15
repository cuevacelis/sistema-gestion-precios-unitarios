import Search from "@/components/search/search";
import { obtenerClientesPaginados } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TableComponent = dynamic(() => import("./data-table"), { ssr: false });
const OptionsTable = dynamic(() => import("./options-table"), { ssr: false });

interface IProjectPage {
  searchParams?: {
    query?: string;
    page?: string;
    rowsPerPage?: string;
  };
}

export default async function ProyectPage({ searchParams }: IProjectPage) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const rowsPerPage = Number(searchParams?.rowsPerPage) || 10;

  return (
    <>
      <main className="block p-4 lg:p-6">
        <div className="flex items-center mb-6">
          <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
          <div className="ml-auto flex items-center gap-2">
            <Suspense
              key={query + currentPage + rowsPerPage}
              fallback={<p>cargando...</p>}
            >
              <GetDataOptionsTable />
            </Suspense>
          </div>
        </div>
        <Search className="mb-6" />
        <Suspense
          key={query + currentPage + rowsPerPage}
          fallback={<p>cargando...</p>}
        >
          <GetDataTable {...{ query, currentPage, rowsPerPage }} />
        </Suspense>
      </main>
    </>
  );
}

async function GetDataTable(props: {
  query: string;
  currentPage: number;
  rowsPerPage: number;
}) {
  const dataPresupuestos = await obtenerClientesPaginados(
    props.rowsPerPage,
    props.currentPage,
    props.query
  );
  return <TableComponent {...{ dataPresupuestos }} />;
}

async function GetDataOptionsTable() {
  return <OptionsTable />;
}
