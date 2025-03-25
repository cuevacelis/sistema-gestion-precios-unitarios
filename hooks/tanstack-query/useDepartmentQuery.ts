import { useQuery } from "@tanstack/react-query";

interface IProps {
	staleTime?: number;
	gcTime?: number;
	isEnabled?: boolean;
	idCountry: string;
}

export default function useDepartmentQuery(props: IProps) {
	return useQuery({
		queryKey: ["departments", props.idCountry],
		queryFn: async () => {
			const response = await fetch("/api/department", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					idCountry: props.idCountry,
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
		enabled: props.isEnabled && !!props.idCountry,
	});
}
