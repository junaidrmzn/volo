import { useCallback } from "react";
import { ScheduleItem, useGetScheduleItems } from "@voloiq/commercial-scheduling-api/v1";
import { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { mergeSerializedFiltersWithQuickFilter, serializeFilters } from "@voloiq/service";

type UseScheduleItemOverviewPageOptions = {
    scheduleId: string;
};

export const useScheduleItemOverviewPage = (options: UseScheduleItemOverviewPageOptions) => {
    const { scheduleId } = options;
    const { sendRequestWithResponseEnvelope } = useGetScheduleItems(scheduleId);

    const fetchAllScheduleItems = useCallback(
        (options: FetchAllResourceOptions<ScheduleItem>) => {
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

    return { fetchAllScheduleItems };
};
