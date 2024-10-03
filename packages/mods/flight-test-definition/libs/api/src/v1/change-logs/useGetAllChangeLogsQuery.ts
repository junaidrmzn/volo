import { useQuery } from "@tanstack/react-query";
import type { UseGetAllChangeLogsOptions } from "./useGetAllChangeLogs";
import { useGetAllChangeLogs } from "./useGetAllChangeLogs";

export const getAllChangeLogsQueryKey = (definitionId: string) => ["changeLogs", definitionId];

export const useGetAllChangeLogsQuery = (options: UseGetAllChangeLogsOptions) => {
    const { definitionId } = options;
    const { getChangeLogs } = useGetAllChangeLogs({ ...options, manual: false });
    const { data: changeLogs } = useQuery({ queryFn: getChangeLogs, queryKey: getAllChangeLogsQueryKey(definitionId) });

    return { changeLogs, getChangeLogs };
};
