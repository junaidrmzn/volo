import { useQuery } from "@tanstack/react-query";
import { useGetVertiports } from "./useGetVertiports";

export const useGetVertiportsQuery = () => {
    const { sendRequest } = useGetVertiports({ manual: true });

    const queryKey = ["vertiports"];
    const vertiportsQuery = useQuery({
        queryKey,
        queryFn: sendRequest,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { vertiports: vertiportsQuery.data || [], isLoading: vertiportsQuery.isLoading };
};
