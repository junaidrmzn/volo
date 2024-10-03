import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import { useCallback } from "react";
import { useBulkEditAircraftTypeService } from "@voloiq/aircraft-management-api/v1";
import type { FilterSet } from "@voloiq/filter-panel";
import { BulkEditResourceOptions, FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";
import { AIRCRAFT_MANAGEMENT } from "../api-hooks/serviceEndpoints";
import { useGetAircraftType, useGetAllAircraftTypesManual } from "../api-hooks/useAircraftTypeService";

const route = `${AIRCRAFT_MANAGEMENT}/aircraft-types`;

const extractAircraftAndPassengerCountWithFilter = (filterString?: FilterSet<Event>) => {
    const aircraftCountFilter = filterString?.filters.find((filter) => filter.propertyName === "aircraftCount");
    const passengerCountFilter = filterString?.filters.find((filter) => filter.propertyName === "passengerSeats");

    return {
        ...(aircraftCountFilter && {
            aircraftCount: aircraftCountFilter.type === "number" ? aircraftCountFilter.value : undefined,
        }),
        ...(passengerCountFilter && {
            passengerSeats: passengerCountFilter.type === "number" ? passengerCountFilter.value : undefined,
        }),
    };
};

const deleteAircraftAndPassengerCountFilter = (filterString?: FilterSet<Event>): FilterSet<Event> | undefined => {
    const filter = JSON.parse(JSON.stringify(filterString));
    if (filter) {
        for (const [index, item] of filter?.filters.entries()) {
            if (item.propertyName === "aircraftCount") filter?.filters.splice(index, 1);
        }
        for (const [index, item] of filter?.filters.entries()) {
            if (item.propertyName === "passengerSeats") filter?.filters.splice(index, 1);
        }
    }
    return filter;
};

export const useAircraftTypeOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetAllAircraftTypesManual();
    const { refetchDataWithResponseEnvelope } = useGetAircraftType();
    const { sendAircraftTypeBulkEditRequest } = useBulkEditAircraftTypeService();

    const fetchAllAircraftTypes = useCallback(
        (options: FetchAllResourceOptions<AircraftType>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            const aircraftTypeFilters = deleteAircraftAndPassengerCountFilter(filterSet);
            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...extractAircraftAndPassengerCountWithFilter(filterSet),
                    ...(aircraftTypeFilters && aircraftTypeFilters.filters.length > 0
                        ? { filter: serializeFilters(aircraftTypeFilters, { useIlikeOperator: true }) }
                        : undefined),
                    orderBy: sortingConfiguration
                        ? `${sortingConfiguration.selectedOption}:${sortingConfiguration.selectedOrder.toUpperCase()}`
                        : undefined,
                    vt912: "true",
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    const fetchAircraftType = useCallback(
        (resourceId: string) => refetchDataWithResponseEnvelope({ url: `${route}/${resourceId}` }),
        [refetchDataWithResponseEnvelope]
    );

    const bulkEditAircraftType = useCallback(
        (options: BulkEditResourceOptions<AircraftType>) => {
            const { filterSet, data } = options;
            return sendAircraftTypeBulkEditRequest({
                params: {
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet, { useIlikeOperator: true }) }
                        : undefined),
                },
                data,
            });
        },
        [sendAircraftTypeBulkEditRequest]
    );

    return {
        fetchAllAircraftTypes,
        fetchAircraftType,
        bulkEditAircraftType,
    };
};
