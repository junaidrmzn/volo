import { useQuery } from "@tanstack/react-query";
import { useGetAllLocations } from "@voloiq/logbook-api/v6";

export const useGetAllLocationsQuery = () => {
    const { getAllLocations } = useGetAllLocations({ serviceOptionsOverride: { options: { manual: true } } });

    const queryKey = ["locations"];
    const locationsQuery = useQuery({
        queryKey,
        queryFn: getAllLocations,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { locations: locationsQuery.data?.data || [], isLocationsLoading: locationsQuery.isLoading };
};
