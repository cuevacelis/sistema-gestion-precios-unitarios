import Modal from "@/components/modal/modal";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	obtenerGruposDePartidasIdProyecto,
	obtenerProyectoDetalle,
} from "@/lib/services/sql-queries";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import VerDetalleProyecto from "../../../[idProyecto]/_components/detalle-proyecto";

interface IPropsEditProyectoModalPage {
	params: Promise<{
		idProyecto: string;
	}>;
}

export default async function VerDetalleProyectoModalPage(
	props: IPropsEditProyectoModalPage,
) {
	const params = await props.params;
	const { idProyecto } = params;
	return (
		<Modal title="Ver detalle del proyecto">
			<Suspense
				key={`ver-detalle-proyecto-${idProyecto}`}
				fallback={<p>Cargando detalle del proyecto...</p>}
			>
				<GetDataVerDetalleProyecto idProyecto={idProyecto} />
			</Suspense>
			<Separator className="col-span-full my-4" />
			<Suspense
				key={`ver-partidas-${idProyecto}`}
				fallback={<p>Cargando grupos de partidas...</p>}
			>
				<GetDataVerPartidas idProyecto={idProyecto} />
			</Suspense>
		</Modal>
	);
}

async function GetDataVerDetalleProyecto({
	idProyecto,
}: {
	idProyecto: string;
}) {
	const dataDetalleProyecto = await obtenerProyectoDetalle(Number(idProyecto));
	if (!dataDetalleProyecto) {
		return notFound();
	}
	return <VerDetalleProyecto dataDetalleProyecto={dataDetalleProyecto} />;
}

async function GetDataVerPartidas({ idProyecto }: { idProyecto: string }) {
	const dataGruposDePartidas =
		await obtenerGruposDePartidasIdProyecto(idProyecto);

	if (dataGruposDePartidas?.length > 0) {
		return (
			<section className="col-span-full">
				<h2 className="text-2xl font-bold mb-4">Grupos de Partidas</h2>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Nombre</TableHead>
							<TableHead>Total</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{dataGruposDePartidas?.map((grupo) => (
							<TableRow key={grupo.grupar_id}>
								<TableCell>{grupo.grupar_id}</TableCell>
								<TableCell className="font-medium">
									{grupo.grupar_nombre}
								</TableCell>
								<TableCell>{grupo.grupar_total}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
		);
	}
	return (
		<p className="col-span-full">
			No hay grupos de partidas asociados al proyecto.
		</p>
	);
}
