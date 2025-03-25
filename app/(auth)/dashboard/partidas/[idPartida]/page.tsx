import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { obtenerPartidaById } from "@/lib/services/sql-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const VerDetallePartida = dynamic(
	() => import("./_components/detalle-partida"),
	{
		loading: () => <p>Cargando...</p>,
	},
);

interface IPropsVerDetallePartida {
	params: Promise<{
		idPartida: string;
	}>;
}

export default async function VerDetallePartidaPage(
	props: IPropsVerDetallePartida,
) {
	return (
		<>
			<div className="block p-4 lg:p-6">
				<h1 className="text-lg font-semibold mb-6">Detalle del Partida</h1>
				<Card x-chunk="overflow-auto" className="mb-6">
					<CardContent>
						<Suspense
							key={(await props.params)?.idPartida}
							fallback={<p>Cargando...</p>}
						>
							<GetDataVerDetallePartida id={(await props.params).idPartida} />
						</Suspense>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

async function GetDataVerDetallePartida(props: { id: string }) {
	const dataEditPresupuesto = await obtenerPartidaById(Number(props.id));
	if (dataEditPresupuesto.length === 0) {
		return notFound();
	}
	return <VerDetallePartida data={dataEditPresupuesto[0]} />;
}
