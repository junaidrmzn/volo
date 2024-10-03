import { useCallback } from "react";
import { useDeleteLog, useGetAllLogs, useGetLog } from "@voloiq/logbook-api/v6";
import type { Log } from "@voloiq/logbook-api/v6";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";

export const useOverviewService = () => {
    const { getAllLogs } = useGetAllLogs({ serviceOptionsOverride: { options: { manual: true } } });
    const { getLog } = useGetLog({ serviceOptionsOverride: { options: { manual: true } } });
    const { deleteLogById } = useDeleteLog();

    const fetchAllLogs = useCallback(
        (options: FetchAllResourceOptions<Log>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            return getAllLogs({
                params: {
                    size,
                    page,
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet) }
                        : undefined),
                    orderBy: sortingConfiguration
                        ? `${sortingConfiguration.selectedOption}:${sortingConfiguration.selectedOrder.toLowerCase()}`
                        : undefined,
                },
            });
        },
        [getAllLogs]
    );

    const fetchLog = useCallback((resourceId: string) => getLog({ url: `/logs/${resourceId}` }), [getLog]);

    const deleteLog = useCallback(
        (resourceId: string) => {
            return new Promise<void>((resolve, reject) => {
                deleteLogById(resourceId)
                    .then(() => resolve())
                    .catch(reject);
            });
        },
        [deleteLogById]
    );

    return { fetchAllLogs, fetchLog, deleteLog };
};
