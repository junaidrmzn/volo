import { useCallback } from "react";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";
import type { TestPointParameter } from "./apiModels";
import { useGetAllTestPointParameters } from "./useGetAllTestPointParameters";

export const useFetchAllParameters = () => {
    const { sendRequestWithResponseEnvelope } = useGetAllTestPointParameters();

    const fetchAllParameters = useCallback(
        (options: FetchAllResourceOptions<TestPointParameter>) => {
            const { page, size, filterSet } = options;
            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet) }
                        : undefined),
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    return { fetchAllParameters };
};
