import { Metadata } from "next";

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
  // const presupuesto_paginado = await obtenerPresupuestosPaginados(
  //   elementsPerPage,
  //   currentPage,
  //   query
  // );

  return (
    <main className="flex flex-1 flex-col p-4 lg:p-6">
      {/* <div className="">
        <h1 className={`text-2xl`}>Presupuestos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<p>cargando...</p>}>
        <div className="">
          <InvoicesTable
            data={presupuesto_paginado.data}
            query={query}
            currentPage={currentPage}
          />
        </div>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={presupuesto_paginado.totalElementos} />
      </div> */}
    </main>
  );
}
