import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

const NuevoProyecto = dynamic(() => import("./nuevo-proyecto"), { ssr: false });
const GrupoPartidas = dynamic(() => import("./grupo-partidas"), { ssr: false });

export default function NuevoProyectoPage() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-6">Nuevo Proyecto</h1>
      <Card x-chunk="overflow-auto">
        <CardContent>
          <GetDataNuevoProyecto />

          <Separator className="my-10" />

          <GetDataGrupoPartidas />
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <div className="flex flex-row gap-2 items-center">
          <label>Presupuesto</label>
          <Input type="text" readOnly value="Calcular desde partidas..." />
        </div>
      </div>
    </div>
  );
}

function GetDataNuevoProyecto() {
  return <NuevoProyecto />;
}

function GetDataGrupoPartidas() {
  return <GrupoPartidas />;
}
