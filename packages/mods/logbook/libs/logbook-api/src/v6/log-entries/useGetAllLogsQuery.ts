import { useQuery } from "@tanstack/react-query";
import type { FilterSet } from "@voloiq/filter-panel";
import type { Log } from "./apiModels";
import type { UseGetAllLogsOptions } from "./useGetAllLogs";
import { useGetAllLogs } from "./useGetAllLogs";

export const getAllLogsQueryKey = (filterSet?: FilterSet<Log>) => ["logs", filterSet];

export const useGetAllLogsQuery = (options?: UseGetAllLogsOptions) => {
    const { filterSet } = options || {};
    const { getAllLogs } = useGetAllLogs(options);

    const {
        data: logs,
        refetch: refetchAllLogs,
        isLoading,
    } = useQuery({
        queryKey: getAllLogsQueryKey(filterSet),
        queryFn: getAllLogs,
    });

    return {
        logs,
        refetchAllLogs,
        isLoading,
    };
};
