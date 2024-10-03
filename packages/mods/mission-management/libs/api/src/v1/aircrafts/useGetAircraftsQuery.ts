import { useQuery } from "@tanstack/react-query";
import { useGetAircrafts } from "./useGetAircrafts";

export const useGetAircraftsQuery = () => {
    const { sendRequest } = useGetAircrafts({ manual: true });

    const queryKey = ["aircrafts"];
    const aircraftsQuery = useQuery({
        queryKey,
        queryFn: sendRequest,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { aircrafts: aircraftsQuery.data || [], isLoading: aircraftsQuery.isLoading, error: aircraftsQuery.error };
};
