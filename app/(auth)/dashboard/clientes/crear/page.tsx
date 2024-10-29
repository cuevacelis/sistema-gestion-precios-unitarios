import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerTipoDocumento } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoCliente = dynamic(() => import("./_components/nuevo-cliente"), {
  loading: () => <p>Cargando...</p>,
});

export default function NuevoClientePage() {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">Crear Nuevo Cliente</h1>
      <Card className="overflow-auto mb-6 pt-6">
        <CardContent>
          <Suspense fallback={<p>Cargando...</p>}>
            <GetDataNuevoCliente />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataNuevoCliente() {
  const dataTipoDocumento = await obtenerTipoDocumento();

  return <NuevoCliente dataTipoDocumento={dataTipoDocumento} />;
}
