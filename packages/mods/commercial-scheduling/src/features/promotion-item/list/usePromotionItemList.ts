import { useCallback } from "react";
import { EarlyAccess, useGetPromotionItems } from "@voloiq/commercial-scheduling-api/v1";
import { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { mergeSerializedFiltersWithQuickFilter } from "@voloiq/service";

export const usePromotionItemList = (promotionId: string) => {
    const { sendRequestWithResponseEnvelope } = useGetPromotionItems(promotionId);

    const fetchPromotionItem = useCallback(
        (options: FetchAllResourceOptions<EarlyAccess>) => {
            const { page, size, quickFilter } = options;
            const mergedSerializedFilters = mergeSerializedFiltersWithQuickFilter("", quickFilter);
            const filters = mergedSerializedFilters ? { filter: mergedSerializedFilters } : undefined;

            return sendRequestWithResponseEnvelope({
                params: { size, page, ...filters },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    return { fetchPromotionItem };
};
