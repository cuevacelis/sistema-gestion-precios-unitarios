import { auth } from "@/auth";
import Pagination from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { obtenerPresupuestosPaginados } from "@/lib/data/sql-queries";
import { Metadata } from "next";
import { Suspense } from "react";
import InvoicesTable, { CreateInvoice } from "./_components/table";

export interface IFetchPresupuestoPaginado {
  paginaActual: number;
  totalDePagina: number;
  elementosPorPagina: number;
  totalDeElementos: number;
  isSuccessful: boolean;
  errorMessage: any;
  data: IDataPresupuestoPginado[];
}

export interface IDataPresupuestoPginado {
  pre_Id: string;
  pre_Codigo: string;
  usu_NomApellidos: string;
  pre_Nombre: string;
  cli_NomApeRazSocial: string;
  ubi_Departamento: string;
  ubi_Provincia: string;
  ubi_Distrito: string;
  pre_Jornal: string;
  pre_FecHorRegistro: string;
}

export const metadata: Metadata = {
  title: "Presupuestos",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await auth();
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const elementsPerPage = 1;

  const presupuesto_paginado = await obtenerPresupuestosPaginados(
    elementsPerPage,
    currentPage,
    Number(session?.user?.id),
    query
  );
  console.log(presupuesto_paginado);

  return (
    <section className="mt-4 mx-5">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Presupuestos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<p>cargando...</p>}>
        <InvoicesTable
          data={presupuesto_paginado.data}
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={presupuesto_paginado.totalElementos} />
      </div>
    </section>
  );
}
