import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateUrlParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateUrlParams = (newParams: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    // Actualiza los parámetros con los nuevos valores
    Object.keys(newParams).forEach((key) => {
      params.set(key, newParams[key]);
    });

    // Actualiza la URL sin recargar la página
    router.replace(`?${params.toString()}`);
  };

  return { updateUrlParams };
}
