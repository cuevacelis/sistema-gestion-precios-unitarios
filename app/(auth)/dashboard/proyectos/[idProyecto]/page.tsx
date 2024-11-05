import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  obtenerGruposDePartidasIdProyecto,
  obtenerProyectoDetalle,
} from "@/lib/services/sql-queries";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import VerDetalleProyecto from "./_components/detalle-proyecto";

interface IPropsVerDetalleProyecto {
  params: Promise<{
    idProyecto: string;
  }>;
}

export default async function VerDetalleProyectoPage(
  props: IPropsVerDetalleProyecto
) {
  const params = await props.params;
  const { idProyecto } = params;
  const uniqueKey = `ver-detalle-proyecto-${idProyecto}`;
  return (
    <div className="block p-4 lg:p-6">
      <h1 className="text-lg font-semibold mb-6">Detalle del Proyecto</h1>
      <Card x-chunk="overflow-auto" className="mb-6">
        <CardContent>
          <Suspense key={uniqueKey} fallback={<p>Cargando...</p>}>
            <GetDataVerDetalleProyecto idProyecto={idProyecto} />
          </Suspense>
          <Separator className="col-span-full my-4" />
          <Suspense key={uniqueKey + "table"} fallback={<p>Cargando...</p>}>
            <GetDataVerPartidas idProyecto={idProyecto} />
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

async function GetDataVerPartidas({ idProyecto }: { idProyecto: string }) {
  const dataGruposDePartidas =
    await obtenerGruposDePartidasIdProyecto(idProyecto);

  if (dataGruposDePartidas?.length > 0) {
    return (
      <section className="col-span-full">
        <h2 className="text-2xl font-bold mb-4">Grupos de Partidas</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataGruposDePartidas?.map((grupo) => (
              <TableRow key={grupo.grupar_id}>
                <TableCell>{grupo.grupar_id}</TableCell>
                <TableCell className="font-medium">
                  {grupo.grupar_nombre}
                </TableCell>
                <TableCell>{grupo.grupar_total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    );
  } else {
    return (
      <p className="col-span-full">
        No hay grupos de partidas asociados al proyecto.
      </p>
    );
  }
}
