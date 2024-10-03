import { useCallback } from "react";
import { Event, useBulkEditEventService } from "@voloiq/network-scheduling-management-api/v1";
import type { BulkEditResourceOptions, FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";
import { useDeleteEvent, useGetAllEventsManually, useGetEventManual } from "../api-hooks/useNetworkSchedulingService";

export const useEventOverviewPage = () => {
    const { sendRequestWithResponseEnvelope: fetchEvents } = useGetAllEventsManually();
    const { refetchDataWithResponseEnvelope: fetchSingleEvent } = useGetEventManual();
    const { sendRequestById: sendDeleteRequest } = useDeleteEvent();
    const { sendEventBulkEditRequest } = useBulkEditEventService();

    const fetchAllEvents = useCallback(
        (options: FetchAllResourceOptions<Event>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            return fetchEvents({
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
        [fetchEvents]
    );

    const fetchEvent = useCallback(
        (resourceId: string) => fetchSingleEvent({ url: `/v1/network-scheduling-management/events/${resourceId}` }),
        [fetchSingleEvent]
    );

    const deleteEvent = useCallback(
        (resourceId: string) => {
            return new Promise<void>((resolve, reject) => {
                sendDeleteRequest(resourceId)
                    .then(() => resolve())
                    .catch(reject);
            });
        },
        [sendDeleteRequest]
    );

    const bulkEditEvent = useCallback(
        (options: BulkEditResourceOptions<Event>) => {
            const { filterSet, data } = options;

            if (data?.fieldType === "aircraft") data.fieldType = "eventAircraftAssignmentEntity.aircraftEntity.id";

            return sendEventBulkEditRequest({
                params: {
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet, { useIlikeOperator: true }) }
                        : undefined),
                },
                data,
            });
        },
        [sendEventBulkEditRequest]
    );

    return {
        fetchAllEvents,
        fetchEvent,
        deleteEvent,
        bulkEditEvent,
    };
};
