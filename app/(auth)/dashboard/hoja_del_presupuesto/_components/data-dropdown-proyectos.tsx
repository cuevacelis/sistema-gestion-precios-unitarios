"use client";
import ComboboxSingleSelection from "@/components/combobox/combobox-single-selection";
import type { obtenerProyectos } from "@/lib/services/sql-queries";
import { useRouter } from "next/navigation";

interface IProps {
	dataProyectos: Awaited<ReturnType<typeof obtenerProyectos>>;
	proyectoId: string | null;
}
export default function DataDropdownProyectos({
	dataProyectos,
	proyectoId,
}: IProps) {
	const router = useRouter();

	const handleSelectChange = (value: string | null) => {
		router.replace(`/dashboard/hoja_del_presupuesto?proyectoId=${value}`);
	};
	return (
		<div className="flex flex-col gap-2">
			<ComboboxSingleSelection
				className="bg-secondary"
				options={dataProyectos.map((item) => ({
					value: String(item.pre_id),
					label: item.pre_nombre,
				}))}
				onSelect={handleSelectChange}
				placeholder={"Seleccione un proyecto..."}
				disabled={!dataProyectos.length}
				value={proyectoId}
			/>
		</div>
	);
}
