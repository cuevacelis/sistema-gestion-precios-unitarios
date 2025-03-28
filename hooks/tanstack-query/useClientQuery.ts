import { useQuery } from "@tanstack/react-query";

interface IProps {
	staleTime?: number;
	gcTime?: number;
	isEnabled?: boolean;
}

export default function useClientQuery(props: IProps) {
	return useQuery({
		queryKey: ["clients"],
		queryFn: async () => {
			const response = await fetch("/api/client", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
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
		enabled: props.isEnabled,
	});
}
