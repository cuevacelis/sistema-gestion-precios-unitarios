import { useQuery } from "@tanstack/react-query";

interface IProps {
  staleTime?: number;
  gcTime?: number;
  isEnabled?: boolean;
  idCountry: string;
  idDepartment: string;
  idProvince: string;
}

export default function useDistrictQuery(props: IProps) {
  return useQuery({
    queryKey: [
      "districts",
      props.idCountry,
      props.idDepartment,
      props.idProvince,
    ],
    queryFn: async () => {
      const response = await fetch("/api/district", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCountry: props.idCountry,
          idDepartment: props.idDepartment,
          idProvince: props.idProvince,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    retry: 0,
    gcTime: props?.gcTime,
    staleTime: props?.staleTime,
    enabled:
      props.isEnabled &&
      !!props.idCountry &&
      !!props.idDepartment &&
      !!props.idProvince,
  });
}
