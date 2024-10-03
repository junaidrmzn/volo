import { useQuery } from "@tanstack/react-query";
import { useGetRegions } from "./useGetRegions";

export const useGetRegionsQuery = () => {
    const { sendRequest } = useGetRegions({ manual: true });

    const queryKey = ["regions"];
    const regionsQuery = useQuery({
        queryKey,
        queryFn: sendRequest,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { regions: regionsQuery.data || [], isLoading: regionsQuery.isLoading };
};
