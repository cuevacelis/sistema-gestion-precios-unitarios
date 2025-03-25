import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import {
	obtenerClientes,
	obtenerProyectosId,
} from "@/lib/services/sql-queries";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import EditarProyectosPage from "./_components/edit-proyecto";
import EditarProyectoSkeleton from "./_components/skeleton";

interface IPropsEditProyecto {
	params: Promise<{
		idProyecto: string;
	}>;
}

export default async function EditarProyectoPage(props: IPropsEditProyecto) {
	const params = await props.params;
	const { idProyecto } = params;
	return (
		<div className="block p-4 lg:p-6">
			<h1 className="text-lg font-semibold mb-6">Editar proyecto</h1>
			<Card x-chunk="overflow-auto" className="mb-6">
				<CardContent>
					<Suspense key={idProyecto} fallback={<EditarProyectoSkeleton />}>
						<GetDataEditarProyecto idProyecto={idProyecto} />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}

async function GetDataEditarProyecto({ idProyecto }: { idProyecto: string }) {
	const dataEditPresupuesto = await obtenerProyectosId(Number(idProyecto));
	if (dataEditPresupuesto.length === 0) {
		return notFound();
	}
	const dataClientes = await obtenerClientes();
	const session = await auth();
	return (
		<EditarProyectosPage
			{...{
				dataClientes,
				session,
				presupuestoId: idProyecto,
				initialData: {
					nameUser: dataEditPresupuesto[0].usu_nomapellidos,
					namePresupuesto: dataEditPresupuesto[0].pre_nombre,
					country: String(dataEditPresupuesto[0].pai_id),
					department: String(dataEditPresupuesto[0].dep_id),
					province: String(dataEditPresupuesto[0].prov_id),
					district: String(dataEditPresupuesto[0].dist_id),
					client: dataEditPresupuesto[0].cli_nomaperazsocial,
					jornal: dataEditPresupuesto[0].pre_jornal,
				},
			}}
		/>
	);
}
