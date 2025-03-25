import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerClientes } from "@/lib/services/sql-queries";
import { Suspense } from "react";
import NuevoProyecto from "./_components/nuevo-proyecto";
import NuevoProyectoSkeleton from "./_components/skeleton";

export default function NuevoProyectoPage() {
	return (
		<div className="p-4 lg:p-6">
			<h1 className="text-2xl font-semibold mb-4">Crear Nuevo Proyecto</h1>
			<Card className="overflow-auto mb-6 pt-6">
				<CardContent>
					<Suspense fallback={<NuevoProyectoSkeleton />}>
						<GetDataNuevoProyecto />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}

async function GetDataNuevoProyecto() {
	const dataClientes = await obtenerClientes();
	const session = await auth();
	return (
		<NuevoProyecto
			{...{
				dataClientes,
				session,
			}}
		/>
	);
}
