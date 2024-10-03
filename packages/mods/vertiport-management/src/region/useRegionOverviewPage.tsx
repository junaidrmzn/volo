import { useCallback } from "react";
import type { BulkEditResourceOptions, FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";
import type { Region } from "@voloiq/vertiport-management-api/v1";
import { useBulkEditRegionService } from "@voloiq/vertiport-management-api/v1";
import { useDeleteRegion, useGetAllRegionsManual, useGetRegionNew } from "../api-hooks/useRegionService";

export const useRegionOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetAllRegionsManual();
    const { refetchDataWithResponseEnvelope } = useGetRegionNew();
    const { sendRegionBulkEditRequest } = useBulkEditRegionService();
    const { sendRequestById } = useDeleteRegion();

    const fetchAllRegions = useCallback(
        (options: FetchAllResourceOptions<Region>) => {
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

    const fetchRegion = useCallback(
        (resourceId: string) =>
            refetchDataWithResponseEnvelope({ url: `/vertiport-management/v1/regions/${resourceId}` }),
        [refetchDataWithResponseEnvelope]
    );

    const deleteRegion = useCallback(
        (resourceId: string) => {
            return new Promise<void>((resolve, reject) => {
                sendRequestById(resourceId)
                    .then(() => resolve())
                    .catch(reject);
            });
        },
        [sendRequestById]
    );

    const bulkEditRegion = useCallback(
        (options: BulkEditResourceOptions<Region>) => {
            const { filterSet, data } = options;
            return sendRegionBulkEditRequest({
                params: {
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet, { useIlikeOperator: true }) }
                        : undefined),
                },
                data,
            });
        },
        [sendRegionBulkEditRequest]
    );

    return {
        fetchAllRegions,
        fetchRegion,
        deleteRegion,
        bulkEditRegion,
    };
};
