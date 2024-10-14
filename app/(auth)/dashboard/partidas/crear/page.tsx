import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import {
  obtenerGruposDePartidas,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoPartida = dynamic(() => import("./_components/nueva-partida"), {
  ssr: false,
  loading: () => <p>Cargando...</p>,
});

export default function NuevoPartidaPage() {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">Crear Nuevo Partida</h1>
      <Card className="overflow-auto mb-6 pt-6">
        <CardContent>
          <Suspense fallback={<p>Cargando...</p>}>
            <GetDataNuevoPartida />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function GetDataNuevoPartida() {
  const dataGruposDePartidas = await obtenerGruposDePartidas();
  const dataUnidadesDeMedida = await obtenerUnidadesDeMedida();
  return (
    <NuevoPartida
      dataGruposDePartidas={dataGruposDePartidas}
      dataUnidadesDeMedida={dataUnidadesDeMedida}
    />
  );
}
