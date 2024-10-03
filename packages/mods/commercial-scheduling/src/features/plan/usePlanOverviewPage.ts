import { useCallback } from "react";
import { Plan, useGetPlans } from "@voloiq/commercial-scheduling-api/v1";
import { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { mergeSerializedFiltersWithQuickFilter, serializeFilters } from "@voloiq/service";

export const usePlanOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetPlans();

    const fetchAllPlans = useCallback(
        (options: FetchAllResourceOptions<Plan>) => {
            const { page, size, sortingConfiguration, filterSet, quickFilter } = options;
            const serializedFilters =
                filterSet && filterSet?.filters.length > 0 ? serializeFilters(filterSet) : undefined;
            const mergedSerializedFilters = mergeSerializedFiltersWithQuickFilter(serializedFilters, quickFilter);
            const filters = mergedSerializedFilters ? { filter: mergedSerializedFilters } : undefined;

            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...filters,
                    order: sortingConfiguration?.selectedOrder,
                    orderBy: sortingConfiguration?.selectedOption,
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    return { fetchAllPlans };
};
