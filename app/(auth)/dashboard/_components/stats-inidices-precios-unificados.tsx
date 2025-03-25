import type { obtenerUltimaFechaPreciosRecomendados } from "@/lib/services/sql-queries";
import { formatDateToDate } from "@/lib/utils";

interface IProps {
	dataLastDateIndicesDePreciosUnificados: Awaited<
		ReturnType<typeof obtenerUltimaFechaPreciosRecomendados>
	>;
}

export default function StatsIndicesDePreciosUnificados({
	dataLastDateIndicesDePreciosUnificados,
}: IProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">Última actualización</span>
				<span className="text-2xl font-bold text-green-600">
					{formatDateToDate(
						String(dataLastDateIndicesDePreciosUnificados?.fecha_publicacion),
					)}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">Áreas Geográficas</span>
				<span className="text-2xl font-bold">6</span>
			</div>
		</div>
	);
}
