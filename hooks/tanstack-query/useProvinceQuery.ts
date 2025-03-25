import { useQuery } from "@tanstack/react-query";

interface IProps {
	staleTime?: number;
	gcTime?: number;
	isEnabled?: boolean;
	idCountry: string;
	idDepartment: string;
}

export default function useProvinceQuery(props: IProps) {
	return useQuery({
		queryKey: ["provinces", props.idCountry, props.idDepartment],
		queryFn: async () => {
			const response = await fetch("/api/province", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					idCountry: props.idCountry,
					idDepartment: props.idDepartment,
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
		enabled: props.isEnabled && !!props.idCountry && !!props.idDepartment,
	});
}
