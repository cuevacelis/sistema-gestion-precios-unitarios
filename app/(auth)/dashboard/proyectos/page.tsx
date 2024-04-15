import { auth } from "@/auth";
import {
  obtenerPresupuestosPaginados,
  obtenerPresupuestosPaginadosSP,
} from "@/lib/data/sql-queries";
import ProyectosComponent from "./proyectos";

export default async function ProyectPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    rowsPerPage?: string;
  };
}) {
  const session = await auth();
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const elementsPerPage = Number(searchParams?.rowsPerPage) || 10;
  const dataPresupuestos = await obtenerPresupuestosPaginados(
    elementsPerPage,
    currentPage,
    Number(session?.user?.id),
    query
  );
  try {
    const data2 = await obtenerPresupuestosPaginadosSP(
      elementsPerPage,
      currentPage,
      query
    );
    console.log(data2);
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="block p-4 lg:p-6">
      <ProyectosComponent data={dataPresupuestos} />
    </main>
  );
}
