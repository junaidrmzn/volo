import type { FlightTestDefinition } from "@voloiq-typescript-api/ftd-types";
import { useCallback } from "react";
import { useGetAllDefinitionsByAta } from "@voloiq/flight-test-definition-api/v1";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";

export const useFetchAllDefinitions = () => {
    const { sendRequestWithResponseEnvelope } = useGetAllDefinitionsByAta();

    const fetchAllDefinitions = useCallback(
        (options: FetchAllResourceOptions<FlightTestDefinition>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...(filterSet && filterSet.filters.length > 0 && { filter: serializeFilters(filterSet) }),
                    orderBy: sortingConfiguration
                        ? `${sortingConfiguration.selectedOption}:${sortingConfiguration.selectedOrder.toLowerCase()}`
                        : undefined,
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    return { fetchAllDefinitions };
};
