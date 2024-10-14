import { Card, CardContent } from "@/components/ui/card";
import { obtenerProyectosId } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const VerDetalleProyecto = dynamic(
  () => import("./_components/detalle-proyecto"),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

interface IPropsVerDetalleProyecto {
  params: {
    idProyecto: string;
  };
}

export default function VerDetalleProyectoPage(
  props: IPropsVerDetalleProyecto
) {
  return (
    <>
      <div className="block p-4 lg:p-6">
        <h1 className="text-lg font-semibold mb-6">Detalle del Proyecto</h1>
        <Card x-chunk="overflow-auto" className="mb-6">
          <CardContent>
            <Suspense
              key={props.params?.idProyecto}
              fallback={<p>Cargando...</p>}
            >
              <GetDataVerDetalleProyecto id={props.params.idProyecto} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

async function GetDataVerDetalleProyecto(props: { id: string }) {
  const dataEditPresupuesto = await obtenerProyectosId(Number(props.id));
  if (dataEditPresupuesto.length === 0) {
    return notFound();
  }
  return <VerDetalleProyecto data={dataEditPresupuesto[0]} />;
}
