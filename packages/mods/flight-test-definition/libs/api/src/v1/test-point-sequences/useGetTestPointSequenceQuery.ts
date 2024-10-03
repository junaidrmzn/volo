import { useQuery } from "@tanstack/react-query";
import type { UseGetTestPointSequenceOptions } from "./useGetTestPointSequence";
import { useGetTestPointSequence } from "./useGetTestPointSequence";

export const getTestPointSequenceQueryKey = (flightTestOrderId: string, testPointSequenceId: string) => [
    "TestPointSequences",
    flightTestOrderId,
    testPointSequenceId,
];

export type UseGetTestPointSequenceQueryOptions = UseGetTestPointSequenceOptions;

export const useGetTestPointSequenceQuery = (options: UseGetTestPointSequenceQueryOptions) => {
    const { flightTestOrderId, testPointSequenceId, serviceOptions } = options;
    const { getTestPointSequence } = useGetTestPointSequence({
        flightTestOrderId,
        testPointSequenceId,
        serviceOptions,
    });

    const { data: testPointSequence, isLoading } = useQuery({
        queryKey: getTestPointSequenceQueryKey(flightTestOrderId, testPointSequenceId),
        queryFn: getTestPointSequence,
    });

    return { testPointSequence, getTestPointSequence, isLoading };
};
