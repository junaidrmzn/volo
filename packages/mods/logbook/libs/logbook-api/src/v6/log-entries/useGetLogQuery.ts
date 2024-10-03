import { useQuery } from "@tanstack/react-query";
import type { UseGetLogOptions } from "./useGetLog";
import { useGetLog } from "./useGetLog";

export const getLogQueryKey = (logId: string) => ["logs", logId];

export const useGetLogQuery = (options: UseGetLogOptions) => {
    const { logId } = options;
    const { getLog } = useGetLog({ logId });

    const {
        data: log,
        refetch: refetchLog,
        isLoading,
    } = useQuery({
        queryKey: getLogQueryKey(logId ?? ""),
        queryFn: getLog,
    });

    return {
        log,
        refetchLog,
        isLoading,
    };
};
