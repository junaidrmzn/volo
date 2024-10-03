import { useQuery } from "@tanstack/react-query";
import type { UseGetAllFlightTestCrewOptions } from "./useGetAllFlightTestCrew";
import { useGetAllFlightTestCrew } from "./useGetAllFlightTestCrew";

export const getAllFlightTestCrewQueryKey = (flightTestOrderId: string) => ["FlightTestCrew", flightTestOrderId];

export type UseGetAllFlightTestCrewQueryOptions = UseGetAllFlightTestCrewOptions;

export const useGetAllFlightTestCrewQuery = (options: UseGetAllFlightTestCrewQueryOptions) => {
    const { getAllFlightTestCrew } = useGetAllFlightTestCrew({
        ...options,
        serviceOptions: {
            options: {
                manual: true,
            },
        },
    });

    const { data, isLoading, ...rest } = useQuery({
        queryKey: getAllFlightTestCrewQueryKey(options.flightTestOrderId),
        queryFn: getAllFlightTestCrew,
    });

    return {
        flightTestCrew: data?.data ?? [],
        isLoading,
        pagination: data?.pagination,
        ...rest,
    };
};
