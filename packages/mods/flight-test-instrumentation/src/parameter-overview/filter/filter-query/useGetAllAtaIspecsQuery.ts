import { useQuery } from "@tanstack/react-query";
import { useOverviewFilter } from "../useOverviewFilter";

export const useGetAllAtaIspecsQuery = () => {
    const { getAllAtaiSpecs } = useOverviewFilter();

    const queryKey = ["ataIspecs"];
    const ataIspecsQuery = useQuery({
        queryKey,
        queryFn: getAllAtaiSpecs,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        ataIspecs: ataIspecsQuery.data || [],
        isAtaIspecsLoading: ataIspecsQuery.isLoading,
    };
};
