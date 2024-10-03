import { useQuery } from "@tanstack/react-query";
import { useGetAllAircrafts } from "@voloiq/logbook-api/v6";

export const useGetAllAircraftsQuery = () => {
    const { getAllAircrafts } = useGetAllAircrafts({ serviceOptionsOverride: { options: { manual: true } } });

    const queryKey = ["aircrafts"];
    const aircraftQuery = useQuery({
        queryKey,
        queryFn: getAllAircrafts,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { aircrafts: aircraftQuery.data?.data || [], isAircraftLoading: aircraftQuery.isLoading };
};
