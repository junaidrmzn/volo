import { useCallback } from "react";
import { Aircraft, useBulkEditAircraftService } from "@voloiq/aircraft-management-api/v1";
import type { BulkEditResourceOptions, FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";
import { useDeleteAircraft, useGetAircraftManual, useGetAllAircrafts } from "../api-hooks/useAircraftService";

export const useAircraftOverviewPage = () => {
    const { sendRequestWithResponseEnvelope: fetchAircrafts } = useGetAllAircrafts();
    const { refetchDataWithResponseEnvelope: fetchSingleAircraft } = useGetAircraftManual();
    const { sendRequestById } = useDeleteAircraft();
    const { sendAircraftBulkEditRequest } = useBulkEditAircraftService();

    const fetchAllAircrafts = useCallback(
        (options: FetchAllResourceOptions<Aircraft>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            return fetchAircrafts({
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
        [fetchAircrafts]
    );

    const fetchAircraft = useCallback(
        (resourceId: string) => fetchSingleAircraft({ url: `/v1/aircraft-management/aircraft/${resourceId}` }),
        [fetchSingleAircraft]
    );

    const deleteAircraft = useCallback(
        (resourceId: string) => {
            return new Promise<void>((resolve, reject) => {
                sendRequestById(resourceId)
                    .then(() => resolve())
                    .catch(reject);
            });
        },
        [sendRequestById]
    );

    const bulkEditAircraft = useCallback(
        (options: BulkEditResourceOptions<Aircraft>) => {
            const { filterSet, data } = options;

            if (Array.isArray(data?.newValue)) data.newValue = data.newValue.map((item) => item.value).join(",");
            if (data?.fieldType === "homebaseVertiport") data.fieldType = "homebaseVertiport.id";

            return sendAircraftBulkEditRequest({
                params: {
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet, { useIlikeOperator: true }) }
                        : undefined),
                },
                data,
            });
        },
        [sendAircraftBulkEditRequest]
    );

    return {
        fetchAllAircrafts,
        fetchAircraft,
        deleteAircraft,
        bulkEditAircraft,
    };
};
