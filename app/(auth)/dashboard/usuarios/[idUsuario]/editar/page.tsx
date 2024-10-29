import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerRoles, obtenerUsuariosById } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditarUsuario = dynamic(() => import("./_components/edit-usuario"), {
  loading: () => <p>Cargando...</p>,
});

interface IPropsEditUsuario {
  params: Promise<{
    idUsuario: string;
  }>;
}

export default async function EditarUsuarioPage(props: IPropsEditUsuario) {
  const params = await props.params;
  return (
    <>
      <div className="block p-4 lg:p-6">
        <h1 className="text-lg font-semibold mb-6">Editar</h1>
        <Card x-chunk="overflow-auto" className="mb-6">
          <CardContent>
            <Suspense key={params.idUsuario} fallback={<p>Cargando...</p>}>
              <GetDataEditarUsuario idUsuario={params.idUsuario} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

async function GetDataEditarUsuario({ idUsuario }: { idUsuario: string }) {
  const dataUsuario = await obtenerUsuariosById(Number(idUsuario));
  const dataRoles = await obtenerRoles();

  if (dataUsuario.length === 0) {
    return notFound();
  }

  return <EditarUsuario dataUsuario={dataUsuario[0]} dataRoles={dataRoles} />;
}
