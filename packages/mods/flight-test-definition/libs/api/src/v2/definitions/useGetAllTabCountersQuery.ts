import { useQuery } from "@tanstack/react-query";
import { UseGetTabCountersOptions, useGetAllTabCounters } from "./useGetAllTabCounters";

export const getAllTabCountersQueryKey = (definitionId?: string) => ["tabCounters", definitionId];

export const useGetAllTabCountersQuery = (options: UseGetTabCountersOptions) => {
    const { definitionId } = options;
    const { getTabCounters } = useGetAllTabCounters({ definitionId });

    const {
        data,
        refetch: getAllTabCounters,
        isLoading,
    } = useQuery({
        queryKey: getAllTabCountersQueryKey(definitionId),
        queryFn: getTabCounters,
    });

    return {
        tabCounters: data,
        getAllTabCounters,
        isLoading,
    };
};
