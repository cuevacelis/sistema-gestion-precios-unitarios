import Modal from "@/components/modal/modal";
import { Skeleton } from "@/components/ui/skeleton";
import {
	obtenerGruposDePartidas,
	obtenerUnidadesDeMedida,
} from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NuevoPartida = dynamic(
	() => import("../../../crear/_components/nueva-partida"),
	{
		loading: () => <p>Cargando...</p>,
	},
);

export default async function NuevoPartidaModalPage() {
	return (
		<Modal title="Crear nuevo partida">
			<Suspense fallback={<Skeleton className="h-10 w-full" />}>
				<GetDataNuevoPartida />
			</Suspense>
		</Modal>
	);
}

async function GetDataNuevoPartida() {
	const dataGruposDePartidas = await obtenerGruposDePartidas();
	const dataUnidadesDeMedida = await obtenerUnidadesDeMedida();
	return (
		<NuevoPartida
			dataGruposDePartidas={dataGruposDePartidas}
			dataUnidadesDeMedida={dataUnidadesDeMedida}
		/>
	);
}
