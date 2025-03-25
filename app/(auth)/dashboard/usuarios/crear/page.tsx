import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerRoles } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoUsuario = dynamic(() => import("./_components/nuevo-usuario"), {
	loading: () => <p>Cargando...</p>,
});

export default function NuevoUsuarioPage() {
	return (
		<div className="p-4 lg:p-6">
			<h1 className="text-2xl font-semibold mb-4">Crear Nuevo Usuario</h1>
			<Card className="overflow-auto mb-6 pt-6">
				<CardContent>
					<Suspense fallback={<p>Cargando...</p>}>
						<GetDataNuevoUsuario />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}

async function GetDataNuevoUsuario() {
	const dataRoles = await obtenerRoles();

	return <NuevoUsuario dataRoles={dataRoles} />;
}
