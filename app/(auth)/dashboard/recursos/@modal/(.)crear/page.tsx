import Modal from "@/components/modal/modal";
import { Skeleton } from "@/components/ui/skeleton";
import {
	obtenerTipoRecurso,
	obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoRecurso = dynamic(
	() => import("../../crear/_components/nuevo-recurso"),
	{
		loading: () => <p>Cargando...</p>,
	},
);

export default async function NuevoRecursoModalPage() {
	return (
		<Modal title="Crear nuevo recurso">
			<Suspense fallback={<Skeleton className="h-10 w-full" />}>
				<GetDataNuevoRecurso />
			</Suspense>
		</Modal>
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
