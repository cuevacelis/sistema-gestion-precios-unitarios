import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useSearchToast(totalResults: number) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      toast.info(
        totalResults > 0 ? "Resultados de búsqueda" : "No hay resultados",
        {
          description: `Se encontraron ${totalResults} resultado(s) para "${query}"`,
          duration: 5000,
        }
      );
    }
  }, [query, totalResults]);
}
