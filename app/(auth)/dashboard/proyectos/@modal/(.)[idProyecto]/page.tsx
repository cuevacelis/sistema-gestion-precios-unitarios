import Modal from "@/components/modal/modal";
import { Suspense } from "react";
import {
  obtenerGruposDePartidasIdProyecto,
  obtenerProyectoDetalle,
} from "@/lib/services/sql-queries";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const VerDetalleProyecto = dynamic(
  () => import("../../[idProyecto]/_components/detalle-proyecto"),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

interface IPropsEditProyectoModalPage {
  params: {
    idProyecto: string;
  };
}

export default function VerDetalleProyectoModalPage({
  params,
}: IPropsEditProyectoModalPage) {
  const { idProyecto } = params;
  return (
    <Modal title="Ver detalle proyecto" classNameDialogContent="h-[500px]">
      <Suspense key={idProyecto} fallback={<p>Cargando...</p>}>
        <GetDataVerDetalleProyecto idProyecto={idProyecto} />
      </Suspense>
      <Separator className="col-span-full my-4" />
      <Suspense key={idProyecto} fallback={<p>Cargando...</p>}>
        <GetDataVerPartidas idProyecto={idProyecto} />
      </Suspense>
    </Modal>
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
