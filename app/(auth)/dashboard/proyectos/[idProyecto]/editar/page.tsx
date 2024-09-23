import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import {
  obtenerClientes,
  obtenerProyectosId,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditarProyecto = dynamic(() => import("./_components/edit-proyecto"), {
  ssr: false,
  loading: () => <p>Cargando...</p>,
});

interface IPropsEditProyecto {
  params: {
    idProyecto: string;
  };
}

export default function EditarProyectoPage(props: IPropsEditProyecto) {
  return (
    <>
      <div className="block p-4 lg:p-6">
        <h1 className="text-lg font-semibold mb-6">Editar</h1>
        <Card x-chunk="overflow-auto" className="mb-6">
          <CardContent>
            <Suspense
              key={props.params?.idProyecto}
              fallback={<p>Cargando...</p>}
            >
              <GetDataEditarProyecto id={props.params.idProyecto} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
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
    <EditarProyecto
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
