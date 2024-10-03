import { QueryClient, QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useMemo } from "react";

export type QueryClientProviderProps = {
    children: ReactNode;
};

export const QueryClientProvider = (props: QueryClientProviderProps) => {
    const { children } = props;
    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const queryClient = useMemo(() => new QueryClient(), []);

    return <TanStackQueryClientProvider client={queryClient}>{children}</TanStackQueryClientProvider>;
};
