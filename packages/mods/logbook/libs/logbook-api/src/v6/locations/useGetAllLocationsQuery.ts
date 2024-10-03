import { useQuery } from "@tanstack/react-query";
import { useGetAllLocations } from "./useGetAllLocations";
import type { UseGetAllLocationsOptions } from "./useGetAllLocations";

export const getAllLocationsQueryKey = () => ["locations"];

export const useGetAllLocationsQuery = (options: UseGetAllLocationsOptions) => {
    const { getAllLocations } = useGetAllLocations(options);

    const {
        data: locations,
        refetch: refetchAllLocations,
        isLoading,
    } = useQuery({
        queryKey: getAllLocationsQueryKey(),
        queryFn: getAllLocations,
    });

    return {
        locations,
        refetchAllLocations,
        isLoading,
    };
};
