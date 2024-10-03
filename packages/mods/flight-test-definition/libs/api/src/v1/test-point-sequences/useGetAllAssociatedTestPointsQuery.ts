import { useQuery } from "@tanstack/react-query";
import type { UseGetAllAssociatedTestPointsOptions } from "./useGetAllAssociatedTestPoints";
import { useGetAllAssociatedTestPoints } from "./useGetAllAssociatedTestPoints";

export const getAllAssociatedTestPointsQueryKey = (flightTestOrderId: string, testPointSequenceId: string) => [
    "TestPointSequenceTestPointAssociations",
    flightTestOrderId,
    testPointSequenceId,
];

export type UseGetAllAssociatedTestPointsQueryOptions = UseGetAllAssociatedTestPointsOptions;

export const useGetAllAssociatedTestPointsQuery = (options: UseGetAllAssociatedTestPointsQueryOptions) => {
    const { flightTestOrderId, testPointSequenceId, serviceOptions } = options;
    const { getAllAssociatedTestPoints } = useGetAllAssociatedTestPoints({
        flightTestOrderId,
        testPointSequenceId,
        serviceOptions,
    });

    const { data: associatedTestPoints, isLoading } = useQuery({
        queryKey: getAllAssociatedTestPointsQueryKey(flightTestOrderId, testPointSequenceId),
        queryFn: getAllAssociatedTestPoints,
    });

    return { associatedTestPoints, getAllAssociatedTestPoints, isLoading };
};
