import { obtenerPreciosRecomendadosByNombreAndDepartamento } from "@/lib/services/sql-queries";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  staleTime?: number;
  gcTime?: number;
  isEnabled?: boolean;
  idDepartament: string;
  nombreRecurso: string;
}

export default function usePrecioRecomendadoQuery(props: IProps) {
  return useQuery({
    queryKey: ["precioRecomendado", props.idDepartament, props.nombreRecurso],
    queryFn: async () => {
      const response = await fetch("/api/precio-recomendado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idDepartament: props.idDepartament,
          nombreRecurso: props.nombreRecurso,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as unknown as Awaited<
        ReturnType<typeof obtenerPreciosRecomendadosByNombreAndDepartamento>
      >;
    },
    refetchOnWindowFocus: false,
    retry: 0,
    gcTime: props?.gcTime,
    staleTime: props?.staleTime,
    enabled: props.isEnabled && !!props.idDepartament && !!props.nombreRecurso,
  });
}
