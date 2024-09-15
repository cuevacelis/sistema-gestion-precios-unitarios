import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerClientes } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoGrupoPartida = dynamic(
  () => import("./_components/nuevo-grupo-partida"),
  {
    ssr: false,
  }
);

interface IPropsNuevoGrupoPartida {
  searchParams?: {
    query?: string;
    page?: string;
    rowsPerPage?: string;
  };
}

export default function NuevoGrupoPartidaPage(props: IPropsNuevoGrupoPartida) {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">Crear Nuevo Grupo de Partida</h1>
      <Card className="overflow-auto mb-6">
        <CardContent>
          <Suspense fallback={<p>Cargando...</p>}>
            <GetDataNuevoGrupoPartida />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataNuevoGrupoPartida() {
  const dataClientes = await obtenerClientes();
  const session = await auth();
  return (
    <NuevoGrupoPartida
      {...{
        dataClientes,
        session,
      }}
    />
  );
}
