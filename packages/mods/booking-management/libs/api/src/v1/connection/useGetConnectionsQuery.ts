import { useQuery } from "@tanstack/react-query";
import { useGetConnections } from "./useGetConnections";

export const useGetConnectionsQuery = () => {
    const { sendRequest } = useGetConnections({ manual: true });

    const queryKey = ["connections"];
    const connectionsQuery = useQuery({
        queryKey,
        queryFn: sendRequest,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { connections: connectionsQuery.data || [], isLoading: connectionsQuery.isLoading };
};
