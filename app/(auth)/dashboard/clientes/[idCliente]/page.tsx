import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerClientesById } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const VerDetalleCliente = dynamic(
  () => import("./_components/detalle-cliente"),
  {
    loading: () => <p>Cargando...</p>,
  }
);

interface IPropsVerDetalleCliente {
  params: Promise<{
    idCliente: string;
  }>;
}

export default async function VerDetalleClientePage(
  props: IPropsVerDetalleCliente
) {
  const params = await props.params;
  const { idCliente } = params;
  return (
    <>
      <div className="block p-4 lg:p-6">
        <h1 className="text-lg font-semibold mb-6">Detalle del Partida</h1>
        <Card x-chunk="overflow-auto" className="mb-6">
          <CardContent>
            <Suspense key={idCliente} fallback={<p>Cargando...</p>}>
              <GetDataVerDetalleCliente id={idCliente} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

async function GetDataVerDetalleCliente(props: { id: string }) {
  const dataCliente = await obtenerClientesById(Number(props.id));
  console.log(dataCliente);
  if (dataCliente.length === 0) {
    return notFound();
  }
  return <VerDetalleCliente data={dataCliente[0]} />;
}
