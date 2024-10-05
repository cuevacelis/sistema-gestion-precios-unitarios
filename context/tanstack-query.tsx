"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface IPropsTanstackQuery {
  children: React.ReactNode;
}

export default function TanstackQueryProvider({
  children,
}: IPropsTanstackQuery) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
