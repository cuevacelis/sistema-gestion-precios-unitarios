"use client";

import {
	QueryClient,
	QueryClientProvider,
	defaultShouldDehydrateQuery,
	isServer,
} from "@tanstack/react-query";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
				gcTime: 0,
				refetchOnWindowFocus: false,
				retry: 1,
			},
			dehydrate: {
				// include pending queries in dehydration
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (isServer) {
		// Servidor: siempre realiza una nueva consulta al cliente
		return makeQueryClient();
	}
	// Navegador: crea un nuevo cliente de consulta si aún no tenemos uno
	// Esto es muy importante, por lo que no volvemos a crear un nuevo cliente si React
	// se suspende durante la renderización inicial. Esto puede no ser necesario si
	// tenemos un límite de suspensión DEBAJO de la creación del cliente de consulta
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}

interface IPropsTanstackQuery {
	children: React.ReactNode;
}

export default function TanstackQueryProvider({
	children,
}: IPropsTanstackQuery) {
	const queryClient = getQueryClient();
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
