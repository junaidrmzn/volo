import { useQuery } from "@tanstack/react-query";
import type { UseGetAllTestPointSequencesOptions } from "./useGetAllTestPointSequences";
import { useGetAllTestPointSequences } from "./useGetAllTestPointSequences";

export const getAllTestPointSequencesQueryKey = (flightTestOrderId: string) => [
    "TestPointSequences",
    flightTestOrderId,
];

export type UseGetAllTestPointSequencesQueryOptions = UseGetAllTestPointSequencesOptions;

export const useGetAllTestPointSequencesQuery = (options: UseGetAllTestPointSequencesOptions) => {
    const { flightTestOrderId, serviceOptions } = options;
    const { getAllTestPointSequences } = useGetAllTestPointSequences({
        flightTestOrderId,
        serviceOptions,
    });

    const { data: testPointSequences, isLoading } = useQuery({
        queryKey: getAllTestPointSequencesQueryKey(flightTestOrderId),
        queryFn: getAllTestPointSequences,
    });

    return { testPointSequences, getAllTestPointSequences, isLoading };
};
