import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface UseSearchResultsToastProps {
  totalResults: number;
}

export function useSearchResultsToast({
  totalResults,
}: UseSearchResultsToastProps) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      toast({
        title: "Resultados de búsqueda",
        description: `Se encontraron ${totalResults} resultado(s) para "${query}"`,
        duration: 5000,
      });
    }
  }, [query, totalResults, toast]);

  return null;
}
