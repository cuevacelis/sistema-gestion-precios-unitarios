import { Card, CardContent } from "@/components/ui/card";
import { obtenerProyectoDetalle } from "@/lib/services/sql-queries";
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

export default function VerDetalleProyectoPage({
  params,
}: IPropsVerDetalleProyecto) {
  const { idProyecto } = params;
  return (
    <div className="block p-4 lg:p-6">
      <h1 className="text-lg font-semibold mb-6">Detalle del Proyecto</h1>
      <Card x-chunk="overflow-auto" className="mb-6">
        <CardContent>
          <Suspense key={idProyecto} fallback={<p>Cargando...</p>}>
            <GetDataVerDetalleProyecto idProyecto={idProyecto} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataVerDetalleProyecto({
  idProyecto,
}: {
  idProyecto: string;
}) {
  const dataDetalleProyecto = await obtenerProyectoDetalle(Number(idProyecto));
  if (!dataDetalleProyecto) {
    return notFound();
  }
  return <VerDetalleProyecto dataDetalleProyecto={dataDetalleProyecto} />;
}
