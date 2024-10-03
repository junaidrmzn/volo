import { useCallback } from "react";
import { Discount, useGetDiscounts } from "@voloiq/commercial-scheduling-api/v1";
import { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { mergeSerializedFiltersWithQuickFilter, serializeFilters } from "@voloiq/service";

export const useDiscountOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetDiscounts();

    const fetchAllDiscounts = useCallback(
        (options: FetchAllResourceOptions<Discount>) => {
            const { page, size, filterSet, quickFilter } = options;
            const serializedFilters =
                filterSet && filterSet?.filters.length > 0 ? serializeFilters(filterSet) : undefined;
            const mergedSerializedFilters = mergeSerializedFiltersWithQuickFilter(serializedFilters, quickFilter);
            const filters = mergedSerializedFilters ? { filter: mergedSerializedFilters } : undefined;

            return sendRequestWithResponseEnvelope({
                params: { size, page, ...filters },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    return { fetchAllDiscounts };
};
