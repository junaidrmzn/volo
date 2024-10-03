import { useQuery } from "@tanstack/react-query";
import { useOverviewFilter } from "../useOverviewFilter";

export const useGetAllAircraftQuery = () => {
    const { getAllAircraft } = useOverviewFilter();

    const queryKey = ["aircrafts"];
    const aircraftQuery = useQuery({
        queryKey,
        queryFn: getAllAircraft,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { aircrafts: aircraftQuery.data || [], isAircraftLoading: aircraftQuery.isLoading };
};
