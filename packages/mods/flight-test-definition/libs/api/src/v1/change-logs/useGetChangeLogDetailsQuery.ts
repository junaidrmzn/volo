import { useQuery } from "@tanstack/react-query";
import type { UseGetChangeLogDetailsOptions } from "./useGetChangeLogDetails";
import { useGetChangeLogDetails } from "./useGetChangeLogDetails";

export const getChangeLogDetailsQueryKey = (definitionId: string, referenceId: string) => [
    "changeLog",
    definitionId,
    referenceId,
];

export const useGetChangeLogDetailsQuery = (options: Omit<UseGetChangeLogDetailsOptions, "manual">) => {
    const { definitionId, referenceId } = options;
    const { getChangeLog } = useGetChangeLogDetails({ ...options, manual: true });
    const { data: changeLog } = useQuery({
        queryFn: getChangeLog,
        queryKey: getChangeLogDetailsQueryKey(definitionId, referenceId),
    });

    return { changeLog, getChangeLog };
};
