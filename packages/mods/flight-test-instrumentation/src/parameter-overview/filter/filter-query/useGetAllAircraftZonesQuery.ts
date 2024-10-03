import { useQuery } from "@tanstack/react-query";
import { useOverviewFilter } from "../useOverviewFilter";

export const useGetAllAircraftZonesQuery = () => {
    const { getAllAircraftZones } = useOverviewFilter();

    const queryKey = ["aircraftZones"];
    const aircraftZonesQuery = useQuery({
        queryKey,
        queryFn: getAllAircraftZones,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { aircraftZones: aircraftZonesQuery.data || [], isAircraftZonesLoading: aircraftZonesQuery.isLoading };
};
