import type { FlightTestDefinition } from "@voloiq-typescript-api/ftd-types";
import { useCallback } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetAllFlightTestOrders } from "@voloiq/flight-test-definition-api/v1";
import { useGetAllFlightTestOrders as useGetAllFlightTestOrdersV2 } from "@voloiq/flight-test-definition-api/v2";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";

export const useFetchAllFlightTestOrders = () => {
    const { getAllFlightTestOrders } = useGetAllFlightTestOrders();
    const { getAllFlightTestOrders: getAllFlightTestOrdersV2 } = useGetAllFlightTestOrdersV2({
        serviceOptions: { options: { manual: true } },
    });

    const { isFeatureFlagEnabled } = useFeatureFlags();

    const fetchAllFlightTestOrders = useCallback(
        (options: FetchAllResourceOptions<FlightTestDefinition>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            return isFeatureFlagEnabled("vte-1516")
                ? getAllFlightTestOrdersV2({
                      params: {
                          size,
                          page,
                          ...(filterSet && filterSet.filters.length > 0 && { filter: serializeFilters(filterSet) }),
                          orderBy: sortingConfiguration
                              ? `${
                                    sortingConfiguration.selectedOption
                                }:${sortingConfiguration.selectedOrder.toLowerCase()}`
                              : undefined,
                      },
                  })
                : getAllFlightTestOrders({
                      params: {
                          size,
                          page,
                          ...(filterSet && filterSet.filters.length > 0 && { filter: serializeFilters(filterSet) }),
                          orderBy: sortingConfiguration
                              ? `${
                                    sortingConfiguration.selectedOption
                                }:${sortingConfiguration.selectedOrder.toLowerCase()}`
                              : undefined,
                      },
                  });
        },
        [getAllFlightTestOrders, getAllFlightTestOrdersV2, isFeatureFlagEnabled]
    );

    return { fetchAllFlightTestOrders };
};
