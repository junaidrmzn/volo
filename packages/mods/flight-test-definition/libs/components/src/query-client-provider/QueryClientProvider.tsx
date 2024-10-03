import { QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useMemoizedQueryClient } from "./useMemoizedQueryClient";

export type QueryClientProviderProps = {
    children: ReactNode;
};

export const QueryClientProvider = (props: QueryClientProviderProps) => {
    const { children } = props;
    const { queryClient } = useMemoizedQueryClient();

    return <TanStackQueryClientProvider client={queryClient}>{children}</TanStackQueryClientProvider>;
};
