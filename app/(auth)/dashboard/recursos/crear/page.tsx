import { Card, CardContent } from "@/components/ui/card";
import {
	obtenerTipoRecurso,
	obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoRecurso = dynamic(() => import("./_components/nuevo-recurso"), {
	loading: () => <p>Cargando...</p>,
});

export default function NuevoRecursoPage() {
	return (
		<div className="p-4 lg:p-6">
			<h1 className="text-2xl font-semibold mb-4">Crear Nuevo Recurso</h1>
			<Card className="overflow-auto mb-6 pt-6">
				<CardContent>
					<Suspense fallback={<p>Cargando...</p>}>
						<GetDataNuevoRecurso />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}

async function GetDataNuevoRecurso() {
	const dataUnidadesDeMedida = await obtenerUnidadesDeMedida();
	const dataTipoRecurso = await obtenerTipoRecurso();
	return (
		<NuevoRecurso
			dataUnidadesDeMedida={dataUnidadesDeMedida}
			dataTipoRecurso={dataTipoRecurso}
		/>
	);
}
