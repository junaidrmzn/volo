import { useQuery } from "@tanstack/react-query";
import type { UseGetAllChangeLogsV2Options } from "./useGetAllChangeLogsV2";
import { useGetAllChangeLogsV2 } from "./useGetAllChangeLogsV2";

export const getAllChangeLogsV2QueryKey = (definitionId: string) => ["changeLogs", definitionId];

export const useGetAllChangeLogsV2Query = (options: UseGetAllChangeLogsV2Options) => {
    const { definitionId } = options;
    const { getChangeLogsV2 } = useGetAllChangeLogsV2({ ...options, manual: true });
    const { data: changeLogsV2 } = useQuery({
        queryFn: getChangeLogsV2,
        queryKey: getAllChangeLogsV2QueryKey(definitionId),
    });

    return { changeLogsV2, getChangeLogsV2 };
};
