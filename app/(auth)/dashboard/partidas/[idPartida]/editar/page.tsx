import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import {
  obtenerClientes,
  obtenerPartidaById,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditarPartida = dynamic(() => import("./_components/edit-partida"), {
  ssr: false,
  loading: () => <p>Cargando...</p>,
});

interface IPropsEditPartida {
  params: {
    idPartida: string;
  };
}

export default function EditarPartidaPage(props: IPropsEditPartida) {
  return (
    <>
      <div className="block p-4 lg:p-6">
        <h1 className="text-lg font-semibold mb-6">Editar</h1>
        <Card x-chunk="overflow-auto" className="mb-6">
          <CardContent>
            <Suspense
              key={props.params?.idPartida}
              fallback={<p>Cargando...</p>}
            >
              <GetDataEditarPartida id={props.params.idPartida} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

async function GetDataEditarPartida(props: { id: string }) {
  const dataEditPresupuesto = await obtenerPartidaById(Number(props.id));
  if (dataEditPresupuesto.length === 0) {
    return notFound();
  }
  return <EditarPartida data={dataEditPresupuesto[0]} />;
}
