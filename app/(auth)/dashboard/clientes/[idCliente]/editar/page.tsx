import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import {
	obtenerClientesById,
	obtenerRoles,
	obtenerTipoDocumento,
	obtenerUsuariosById,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditarUsuario = dynamic(() => import("./_components/edit-cliente"), {
	loading: () => <p>Cargando...</p>,
});

interface IPropsEditUsuario {
	params: Promise<{
		idCliente: string;
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
						<Suspense key={params.idCliente} fallback={<p>Cargando...</p>}>
							<GetDataEditarUsuario idCliente={params.idCliente} />
						</Suspense>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

async function GetDataEditarUsuario({ idCliente }: { idCliente: string }) {
	const dataCliente = await obtenerClientesById(Number(idCliente));
	const dataTipoDocumento = await obtenerTipoDocumento();

	if (dataCliente.length === 0) {
		return notFound();
	}

	return (
		<EditarUsuario
			dataCliente={dataCliente[0]}
			dataTipoDocumento={dataTipoDocumento}
		/>
	);
}
