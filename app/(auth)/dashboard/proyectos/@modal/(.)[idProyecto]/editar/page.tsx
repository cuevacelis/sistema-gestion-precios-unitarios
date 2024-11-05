import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import {
  obtenerClientes,
  obtenerProyectosId,
} from "@/lib/services/sql-queries";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import EditarProyectosPage from "../../../[idProyecto]/editar/_components/edit-proyecto";
import EditarProyectoSkeleton from "../../../[idProyecto]/editar/_components/skeleton";

interface IPropsEditProyectoModalPage {
  params: Promise<{
    idProyecto: string;
  }>;
}

export default async function EditarProyectoModalPage(
  props: IPropsEditProyectoModalPage
) {
  return (
    <Modal title="Editar proyecto">
      <Suspense fallback={<EditarProyectoSkeleton />}>
        <GetDataEditarProyecto id={(await props.params).idProyecto} />
      </Suspense>
    </Modal>
  );
}

async function GetDataEditarProyecto(props: { id: string }) {
  const dataEditPresupuesto = await obtenerProyectosId(Number(props.id));
  if (dataEditPresupuesto.length === 0) {
    return notFound();
  }
  const dataClientes = await obtenerClientes();
  const session = await auth();
  return (
    <EditarProyectosPage
      {...{
        dataClientes,
        session,
        presupuestoId: props.id,
        initialData: {
          nameUser: dataEditPresupuesto[0].usu_nomapellidos,
          namePresupuesto: dataEditPresupuesto[0].pre_nombre,
          country: String(dataEditPresupuesto[0].pai_id),
          department: String(dataEditPresupuesto[0].dep_id),
          province: String(dataEditPresupuesto[0].prov_id),
          district: String(dataEditPresupuesto[0].dist_id),
          client: dataEditPresupuesto[0].cli_nomaperazsocial,
          jornal: dataEditPresupuesto[0].pre_jornal,
        },
      }}
    />
  );
}
