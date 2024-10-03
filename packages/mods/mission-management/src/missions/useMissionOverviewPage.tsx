import { useCallback } from "react";
import { Mission, useBulkUpdateMission, useGetAllMissions } from "@voloiq/network-schedule-management-api/v1";
import type { BulkEditResourceOptions, FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";

export const useMissionOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetAllMissions({ options: { manual: true } });
    const { sendMissionBulkEditRequest } = useBulkUpdateMission();

    const fetchAllMissions = useCallback(
        (options: FetchAllResourceOptions<Mission>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet, { useIlikeOperator: true }) }
                        : undefined),
                    orderBy: sortingConfiguration
                        ? `${sortingConfiguration.selectedOption}:${sortingConfiguration.selectedOrder.toUpperCase()}`
                        : undefined,
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    const bulkEditMission = useCallback(
        (options: BulkEditResourceOptions<Mission>) => {
            const { filterSet, data } = options;
            return sendMissionBulkEditRequest({
                params: {
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet, { useIlikeOperator: true }) }
                        : undefined),
                },
                data,
            });
        },
        [sendMissionBulkEditRequest]
    );

    return {
        fetchAllMissions,
        bulkEditMission,
    };
};
