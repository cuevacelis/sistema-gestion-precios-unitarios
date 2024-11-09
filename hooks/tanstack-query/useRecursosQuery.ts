import { obtenerRecursos } from "@/lib/services/sql-queries";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  staleTime?: number;
  gcTime?: number;
  isEnabled?: boolean;
}

export default function useRecursosQuery(props: IProps) {
  return useQuery({
    queryKey: ["recursos"],
    queryFn: async () => {
      const response = await fetch("/api/recurso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as unknown as Awaited<
        ReturnType<typeof obtenerRecursos>
      >;
    },
    refetchOnWindowFocus: false,
    retry: 0,
    gcTime: props?.gcTime,
    staleTime: props?.staleTime,
    enabled: props.isEnabled,
  });
}
