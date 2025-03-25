import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerUsuariosById } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const VerDetalleUsuario = dynamic(
	() => import("./_components/detalle-usuario"),
	{
		loading: () => <p>Cargando...</p>,
	},
);

interface IPropsVerDetalleUsuario {
	params: Promise<{
		idUsuario: string;
	}>;
}

export default async function VerDetalleUsuarioPage(
	props: IPropsVerDetalleUsuario,
) {
	const params = await props.params;
	const { idUsuario } = params;
	return (
		<>
			<div className="block p-4 lg:p-6">
				<h1 className="text-lg font-semibold mb-6">Detalle del Partida</h1>
				<Card x-chunk="overflow-auto" className="mb-6">
					<CardContent>
						<Suspense key={idUsuario} fallback={<p>Cargando...</p>}>
							<GetDataVerDetalleUsuario id={idUsuario} />
						</Suspense>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

async function GetDataVerDetalleUsuario(props: { id: string }) {
	const dataUsuario = await obtenerUsuariosById(Number(props.id));
	if (dataUsuario.length === 0) {
		return notFound();
	}
	return <VerDetalleUsuario data={dataUsuario[0]} />;
}
