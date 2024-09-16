import { auth } from "@/auth";
import { obtenerClientes } from "@/lib/services/sql-queries";
import NuevoProyectoModal from "./_components/nuevo-proyecto-modal";
// import NuevoProyecto from "../../crear/_components/nuevo-proyecto";

export default async function CrearProyectoModal() {
  const dataClientes = await obtenerClientes();
  const session = await auth();

  return <NuevoProyectoModal dataClientes={dataClientes} session={session} />;
  // return (
  //   <Modal>
  //     {/* <NuevoProyecto dataClientes={dataClientes} session={session} /> */}
  //     <p>ff</p>
  //     <form action={actionPrueba} method="post">
  //       <input type="text" name="nombre" />
  //       <button type="submit">Enviar</button>
  //     </form>
  //   </Modal>
  // );
}
