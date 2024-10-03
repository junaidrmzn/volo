import { QueryClient, QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export type QueryClientProviderProps = {
    children: ReactNode;
};

export const QueryClientProvider = (props: QueryClientProviderProps) => {
    const { children } = props;
    const queryClient = new QueryClient();

    return <TanStackQueryClientProvider client={queryClient}>{children}</TanStackQueryClientProvider>;
};
