import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerClientes } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoProyecto = dynamic(() => import("./_components/nuevo-proyecto"), {
  ssr: false,
  loading: () => <p>Cargando...</p>,
});

export default function NuevoProyectoPage() {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">Crear Nuevo Proyecto</h1>
      <Card className="overflow-auto mb-6 pt-6">
        <CardContent>
          <Suspense fallback={<p>Cargando...</p>}>
            <GetDataNuevoProyecto />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataNuevoProyecto() {
  const dataClientes = await obtenerClientes();
  const session = await auth();
  return (
    <NuevoProyecto
      {...{
        dataClientes,
        session,
      }}
    />
  );
}
