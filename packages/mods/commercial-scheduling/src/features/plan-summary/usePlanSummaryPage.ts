import { useCallback } from "react";
import { PlanSummary, useGetPlanSummaries } from "@voloiq/commercial-scheduling-api/v1";
import { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { mergeSerializedFiltersWithQuickFilter, serializeFilters } from "@voloiq/service";

export const usePlanSummaryPage = (planId: string) => {
    const { sendRequestWithResponseEnvelope } = useGetPlanSummaries(planId ?? "-1");

    const fetchAllPlanSummaries = useCallback(
        (options: FetchAllResourceOptions<PlanSummary>) => {
            const { page, size, filterSet, quickFilter } = options;
            const serializedFilters =
                filterSet && filterSet?.filters.length > 0 ? serializeFilters(filterSet) : undefined;
            const mergedSerializedFilters = mergeSerializedFiltersWithQuickFilter(serializedFilters, quickFilter);
            const filters = mergedSerializedFilters ? { filter: mergedSerializedFilters } : undefined;

            return sendRequestWithResponseEnvelope({
                params: { page, size, ...filters },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    return { fetchAllPlanSummaries };
};
