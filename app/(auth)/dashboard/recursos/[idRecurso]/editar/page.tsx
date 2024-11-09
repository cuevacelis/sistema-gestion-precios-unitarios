import { Card, CardContent } from "@/components/ui/card";
import {
  obtenerRecursoById,
  obtenerTipoRecurso,
  obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const EditarRecurso = dynamic(() => import("./_components/editart-recurso"), {
  loading: () => <p>Cargando...</p>,
});

interface IPropsEditarRecurso {
  params: Promise<{
    idRecurso: string;
  }>;
}

export default async function EditarRecursoPage({
  params,
}: IPropsEditarRecurso) {
  const { idRecurso } = await params;
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold mb-4">Editar Recurso</h1>
      <Card className="overflow-auto mb-6 pt-6">
        <CardContent>
          <Suspense fallback={<p>Cargando...</p>}>
            <GetDataEditarRecurso idRecurso={idRecurso} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

interface IGetDataEditarRecurso {
  idRecurso: string;
}

async function GetDataEditarRecurso({ idRecurso }: IGetDataEditarRecurso) {
  const dataRecurso = await obtenerRecursoById(Number(idRecurso));
  const dataUnidadesDeMedida = await obtenerUnidadesDeMedida();
  const dataTipoRecurso = await obtenerTipoRecurso();
  return (
    <EditarRecurso
      dataRecurso={dataRecurso}
      dataUnidadesDeMedida={dataUnidadesDeMedida}
      dataTipoRecurso={dataTipoRecurso}
    />
  );
}
