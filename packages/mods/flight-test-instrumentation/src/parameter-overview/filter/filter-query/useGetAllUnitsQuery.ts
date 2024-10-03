import { useQuery } from "@tanstack/react-query";
import { useOverviewFilter } from "../useOverviewFilter";

export const useGetAllUnitsQuery = () => {
    const { getAllUnits } = useOverviewFilter();

    const queryKey = ["units"];
    const unitsQuery = useQuery({
        queryKey,
        queryFn: getAllUnits,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        units: unitsQuery.data || [],
        isUnitsLoading: unitsQuery.isLoading,
    };
};
