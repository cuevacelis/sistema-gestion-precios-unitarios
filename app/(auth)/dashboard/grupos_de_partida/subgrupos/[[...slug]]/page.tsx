import ModuleIconsComponent from "@/components/navbar/navbar-logged/_components/module-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import {
	obtenerGruposDePartidasIdProyecto,
	obtenerGruposDePartidasIdRecursive,
	obtenerIsPartidasDeGrupoPartidaId,
	obtenerNombreGruposDePartidasById,
	obtenerNombrePresupuestosById,
} from "@/lib/services/sql-queries";
import type {
	IDataDBObtenerGruposDePartidasId,
	ISearchParams,
} from "@/lib/types/types";
import { convertToStringOrNull } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const BackButtonHistory = dynamic(
	() => import("@/components/back-button/back-button-history"),
	{
		loading: () => <Skeleton className="h-9 w-9" />,
	},
);

const OptionsTable = dynamic(() => import("../../_components/options-table"), {
	loading: () => <Skeleton className="h-10 w-full" />,
});

const TableComponent = dynamic(() => import("../../_components/data-table"), {
	loading: () => <TableSkeleton />,
});

interface IGruposDePartidaPage {
	searchParams: Promise<ISearchParams>;
	params: Promise<{
		slug?: string[];
	}>;
}

export default async function GruposDePartidaSubgruposPage(
	props: IGruposDePartidaPage,
) {
	const params = await props.params;
	const searchParams = await props.searchParams;
	const { slug = [] } = params;
	const isSubGroup = slug.length > 0;
	const totalSubgrupos = slug.length;
	const lastGrupoPartidaId = slug[slug.length - 1];
	const { page, rowsPerPage, query, proyectoId } = searchParams;
	const uniqueKey = `table-grupos-de-partida-${page}-${rowsPerPage}-${query}-${proyectoId}-${slug.join("-")}`;

	return (
		<div className="space-y-6">
			<Card className="p-6">
				<CardHeader className="px-0 pt-0">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" />
					<Suspense
						key={uniqueKey}
						fallback={<Skeleton className="h-10 w-full" />}
					>
						<Title
							idPresupuesto={proyectoId}
							idGrupoPartida={lastGrupoPartidaId}
							isSubGroup={isSubGroup}
							totalSubgrupos={totalSubgrupos}
						/>
					</Suspense>
				</CardHeader>
			</Card>

			<Card className="p-6">
				<CardContent className="px-0 py-0">
					<Suspense
						key={uniqueKey}
						fallback={<Skeleton className="h-10 w-full" />}
					>
						<OptionsTableData
							isSubGroup={isSubGroup}
							idProyecto={proyectoId}
							lastGrupoPartidaId={lastGrupoPartidaId}
						/>
					</Suspense>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-6">
					<Suspense key={uniqueKey} fallback={<TableSkeleton />}>
						<TableWrapper
							isSubGroup={isSubGroup}
							idProyecto={proyectoId}
							lastGrupoPartidaId={lastGrupoPartidaId}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}

async function Title({
	idPresupuesto,
	idGrupoPartida,
	isSubGroup,
	totalSubgrupos,
}: {
	idPresupuesto: string | string[] | undefined;
	idGrupoPartida: string | string[] | undefined;
	isSubGroup: boolean;
	totalSubgrupos: number;
}) {
	let dataPresupuesto: Awaited<
		ReturnType<typeof obtenerNombrePresupuestosById>
	>;
	let dataGrupoPartida: Awaited<
		ReturnType<typeof obtenerNombreGruposDePartidasById>
	>;

	if (idPresupuesto) {
		dataPresupuesto = await obtenerNombrePresupuestosById(
			String(idPresupuesto),
		);
	}

	if (idGrupoPartida) {
		dataGrupoPartida = await obtenerNombreGruposDePartidasById(
			String(idGrupoPartida),
		);
		dataPresupuesto = await obtenerNombrePresupuestosById(
			String(dataGrupoPartida?.pre_id),
		);
	}

	return (
		<div className="flex items-center gap-4">
			<BackButtonHistory />
			<CardTitle className="text-2xl font-bold flex flex-col overflow-auto">
				<div className="flex items-center">
					<ModuleIconsComponent
						className="mr-2 h-8 w-8 flex-shrink-0"
						modNombre="Grupos de Partida"
					/>
					{isSubGroup ? (
						<p>
							Grupos de Partida del{" "}
							{totalSubgrupos === 1 ? "grupo" : "subgrupo"}:{" "}
							<span className="italic text-lg underline underline-offset-4">
								{dataGrupoPartida?.grupar_nombre}
							</span>
						</p>
					) : (
						<p>Grupos de partidas</p>
					)}
				</div>
				{dataPresupuesto && (
					<div className="flex items-center">
						<ModuleIconsComponent
							className="mr-2 h-5 w-5 flex-shrink-0 text-blue-600"
							modNombre="proyectos"
						/>
						<p className="text-base text-blue-600 font-medium">
							Proyecto:{" "}
							<Link
								href={`/dashboard/proyectos/${dataPresupuesto?.pre_id}`}
								className="underline underline-offset-4 italic"
							>
								{dataPresupuesto?.pre_nombre}
							</Link>
						</p>
					</div>
				)}
			</CardTitle>
		</div>
	);
}

interface OptionsTableDataProps {
	isSubGroup: boolean;
	idProyecto: string | string[] | undefined;
	lastGrupoPartidaId: string | string[] | undefined;
}

async function OptionsTableData({
	isSubGroup,
	idProyecto,
	lastGrupoPartidaId,
}: OptionsTableDataProps) {
	let gruposDePartidas: IDataDBObtenerGruposDePartidasId[] = [];
	let isPartidasAssigned = false;

	if (isSubGroup) {
		gruposDePartidas = await obtenerGruposDePartidasIdRecursive(
			convertToStringOrNull(idProyecto),
			String(lastGrupoPartidaId),
		);
		isPartidasAssigned = await obtenerIsPartidasDeGrupoPartidaId(
			String(lastGrupoPartidaId),
		);
	} else {
		gruposDePartidas = await obtenerGruposDePartidasIdProyecto(
			convertToStringOrNull(idProyecto),
		);
	}
	return (
		<OptionsTable
			isTheLastChildInTheListGrupoPartida={gruposDePartidas.length === 0}
			isPartidasAssigned={isPartidasAssigned}
			lastGrupoPartidaId={String(lastGrupoPartidaId)}
		/>
	);
}

interface TableWrapperProps {
	isSubGroup: boolean;
	idProyecto: string | string[] | undefined;
	lastGrupoPartidaId: string | string[] | undefined;
}

async function TableWrapper({
	isSubGroup,
	idProyecto,
	lastGrupoPartidaId,
}: TableWrapperProps) {
	let gruposDePartidas: IDataDBObtenerGruposDePartidasId[] = [];
	let isPartidasAssigned = false;

	if (isSubGroup) {
		gruposDePartidas = await obtenerGruposDePartidasIdRecursive(
			convertToStringOrNull(idProyecto),
			String(lastGrupoPartidaId),
		);
		isPartidasAssigned = await obtenerIsPartidasDeGrupoPartidaId(
			String(lastGrupoPartidaId),
		);
	} else {
		gruposDePartidas = await obtenerGruposDePartidasIdProyecto(
			convertToStringOrNull(idProyecto),
		);
	}

	return (
		<TableComponent
			dataGruposDePartidas={gruposDePartidas}
			isPartidasAssigned={isPartidasAssigned}
			lastGrupoPartidaId={String(lastGrupoPartidaId)}
		/>
	);
}
