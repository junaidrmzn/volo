import type { Event } from "@voloiq-typescript-api/network-scheduling-types";
import { Aircraft } from "@voloiq/network-scheduling-management-api/v1";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";

const networkSchedulingEventsRoute = "/v1/network-scheduling-management/events";
const networkSchedulingAircraftRoute = "v1/network-scheduling-management/aircraft";

export const useCreateEvent = () =>
    useCreateService({
        route: networkSchedulingEventsRoute,
    });

export const useGetAllEvents = (
    pageNumber: number = 1,
    pageSize: number = 100,
    orderByParameter?: string,
    filterString?: string
) =>
    useGetAllService<Event>({
        params: {
            page: pageNumber,
            size: pageSize,
            ...(orderByParameter && { orderBy: orderByParameter }),
            ...(filterString && { filter: filterString }),
        },
        route: networkSchedulingEventsRoute,
    });

export const useGetAllEventsManually = () =>
    useGetAllService<Event>({
        route: networkSchedulingEventsRoute,
        options: {
            autoCancel: false,
            manual: true,
        },
    });

export const useGetEvent = (eventId: string) =>
    useGetService<Event>({
        route: networkSchedulingEventsRoute,
        resourceId: eventId,
    });

export const useGetEventManual = () =>
    useGetService<Event>({ route: networkSchedulingEventsRoute, resourceId: "", options: { manual: true } });

export const useUpdateEvent = () => useUpdateService({ route: networkSchedulingEventsRoute });
export const useDeleteEvent = (version?: number) =>
    useDeleteService({
        route: networkSchedulingEventsRoute,
        config: { params: { version } },
    });

export const generateValidityFilterString = (
    validityStartDate: string | undefined,
    validityEndDate: string | undefined
) => {
    let filterString = "";
    if (validityStartDate && validityEndDate) {
        filterString += `validFrom LE '${validityStartDate}' AND (validTo GE '${validityEndDate}' OR validTo IS 'null')`;
    }
    return filterString;
};

export const useGetAllAircraftWithinValidity = (
    validFrom?: string,
    validTo?: string,
    pageNumber: number = 1,
    pageSize: number = 100
) =>
    useGetAllService<Aircraft>({
        params: {
            page: pageNumber,
            size: pageSize,
            filter: generateValidityFilterString(validFrom, validTo),
        },
        route: networkSchedulingAircraftRoute,
    });
