import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  obtenerClientes,
  obtenerPresupuestosId,
  obtenerUbicacion,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditarProyecto = dynamic(() => import("./_components/edit-proyecto"), {
  ssr: false,
});

interface IPropsEditProyecto {
  params: {
    id: string;
  };
}

export default function NuevoProyectoPage(props: IPropsEditProyecto) {
  return (
    <>
      <div className="block p-4 lg:p-6">
        <h1 className="text-lg font-semibold mb-6">Editar Proyecto</h1>
        <Card x-chunk="overflow-auto" className="mb-6">
          <CardContent>
            <Suspense key={props.params?.id} fallback={<p>cargando...</p>}>
              <GetDataEditarProyecto id={props.params.id} />
            </Suspense>
            <Separator className="my-10" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

async function GetDataEditarProyecto(props: { id: string }) {
  const dataEditPresupuesto = await obtenerPresupuestosId(Number(props.id));
  if (dataEditPresupuesto.recordset.length === 0) {
    return notFound();
  }
  const dataUbicacion = await obtenerUbicacion();
  const dataClientes = await obtenerClientes();
  const session = await auth();
  return (
    <EditarProyecto
      {...{
        id: props.id,
        dataUbicacion,
        dataClientes,
        dataEditPresupuesto,
        session,
      }}
    />
  );
}
