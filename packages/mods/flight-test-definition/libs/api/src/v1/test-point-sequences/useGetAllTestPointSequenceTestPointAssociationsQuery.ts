import { useQuery } from "@tanstack/react-query";
import type { UseGetAllTestPointSequenceTestPointAssociationsOptions } from "./useGetAllTestPointSequenceTestPointAssociations";
import { useGetAllTestPointSequenceTestPointAssociations } from "./useGetAllTestPointSequenceTestPointAssociations";

export const getAllTestPointSequenceTestPointAssociationsQueryKey = (
    flightTestOrderId: string,
    testPointSequenceId: string
) => ["TestPointAssociations", flightTestOrderId, testPointSequenceId];

export type UseGetAllTestPointAssociationsQueryOptions = UseGetAllTestPointSequenceTestPointAssociationsOptions;

export const useGetAllTestPointSequenceTestPointAssociationsQuery = (
    options: UseGetAllTestPointSequenceTestPointAssociationsOptions
) => {
    const { flightTestOrderId, testPointSequenceId, serviceOptions } = options;
    const { getAllTestPointSequenceTestPointAssociations } = useGetAllTestPointSequenceTestPointAssociations({
        flightTestOrderId,
        testPointSequenceId,
        serviceOptions,
    });

    const {
        data: testPointAssociations,
        isLoading,
        isFetching,
        status,
    } = useQuery({
        queryKey: getAllTestPointSequenceTestPointAssociationsQueryKey(flightTestOrderId, testPointSequenceId),
        queryFn: getAllTestPointSequenceTestPointAssociations,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return { testPointAssociations, getAllTestPointSequenceTestPointAssociations, isLoading, isFetching, status };
};
