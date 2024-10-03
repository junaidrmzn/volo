import { QueryClient, QueryClientProvider } from "react-query";

export const ReactQueryClientProvider: FCC = (props) => {
    const { children } = props;
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
