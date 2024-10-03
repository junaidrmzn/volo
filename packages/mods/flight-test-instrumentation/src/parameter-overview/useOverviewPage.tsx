import type { Parameter } from "@voloiq-typescript-api/fti-types";
import { useCallback } from "react";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";
import { useGetParameter, useGetParameters } from "../libs/fti-api";
import { useGetRoute } from "../libs/fti-api/useGetRoute";

export const useOverviewPage = () => {
    const baseRoute = "parameters";
    const { sendRequestWithResponseEnvelope } = useGetParameters();
    const { refetchDataWithResponseEnvelope } = useGetParameter();
    const { route } = useGetRoute({ baseRoute });

    const fetchAllParameter = useCallback(
        (options: FetchAllResourceOptions<Parameter>) => {
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

    const fetchParameter = useCallback(
        (resourceId: string) => refetchDataWithResponseEnvelope({ url: `${route}/${resourceId}` }),
        [refetchDataWithResponseEnvelope, route]
    );

    return { fetchAllParameter, fetchParameter };
};
