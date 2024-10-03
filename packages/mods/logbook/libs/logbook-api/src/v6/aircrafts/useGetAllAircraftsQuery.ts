import { useQuery } from "@tanstack/react-query";
import { useGetAllAircrafts } from "./useGetAllAircrafts";
import type { GetAllAircraftOptions } from "./useGetAllAircrafts";

export const getAllAircraftsQueryKey = () => ["aircrafts"];

export const useGetAllAircraftsQuery = (options?: GetAllAircraftOptions) => {
    const { getAllAircrafts } = useGetAllAircrafts(options);

    const {
        data,
        error,
        refetch: refetchAllAircrafts,
        isLoading,
    } = useQuery({
        queryKey: getAllAircraftsQueryKey(),
        queryFn: getAllAircrafts,
    });

    return {
        aircrafts: data?.data,
        error,
        refetchAllAircrafts,
        isLoading,
        pagination: data?.pagination,
    };
};
