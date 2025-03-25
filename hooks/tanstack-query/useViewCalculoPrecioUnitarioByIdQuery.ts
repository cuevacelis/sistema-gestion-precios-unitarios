import {
	type obtenerAsignacionesRecursoToPartidaByRecurso,
	obtenerPartidaById,
} from "@/lib/services/sql-queries";
import { useQuery } from "@tanstack/react-query";

interface IProps {
	staleTime?: number;
	gcTime?: number;
	isEnabled?: boolean;
	idPartida: number;
	idRecurso: number;
}

export default function useViewCalculoPrecioUnitarioByIdQuery(props: IProps) {
	return useQuery({
		queryKey: ["calculoPrecioUnitario", props.idPartida, props.idRecurso],
		queryFn: async () => {
			const response = await fetch("/api/calculo-unitario-by-id", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					idPartida: props.idPartida,
					idRecurso: props.idRecurso,
				}),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json() as unknown as Awaited<
				ReturnType<typeof obtenerAsignacionesRecursoToPartidaByRecurso>
			>;
		},
		refetchOnWindowFocus: false,
		retry: 0,
		gcTime: props?.gcTime,
		staleTime: props?.staleTime,
		enabled: props.isEnabled && !!props.idPartida && !!props.idRecurso,
	});
}
