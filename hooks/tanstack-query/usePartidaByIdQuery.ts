import type { obtenerPartidaById } from "@/lib/services/sql-queries";
import { useQuery } from "@tanstack/react-query";

interface IProps {
	staleTime?: number;
	gcTime?: number;
	isEnabled?: boolean;
	idPartida: number;
}

export default function usePartidaByIdQuery(props: IProps) {
	return useQuery({
		queryKey: ["partidas", props.idPartida],
		queryFn: async () => {
			const response = await fetch("/api/partida-by-id", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					idPartida: props.idPartida,
				}),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json() as unknown as Awaited<
				ReturnType<typeof obtenerPartidaById>
			>;
		},
		refetchOnWindowFocus: false,
		retry: 0,
		gcTime: props?.gcTime,
		staleTime: props?.staleTime,
		enabled: props.isEnabled && !!props.idPartida,
	});
}
