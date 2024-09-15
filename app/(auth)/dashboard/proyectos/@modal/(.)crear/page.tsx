import { auth } from "@/auth";
import { obtenerClientes } from "@/lib/services/sql-queries";
import NuevoProyectoModal from "./_components/nuevo-proyecto-modal";

export default async function CrearProyectoModal() {
  const dataClientes = await obtenerClientes();
  const session = await auth();

  return <NuevoProyectoModal dataClientes={dataClientes} session={session} />;
}
