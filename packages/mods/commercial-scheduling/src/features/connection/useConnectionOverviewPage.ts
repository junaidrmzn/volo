import { useCallback } from "react";
import {
    CONNECTION_BASE_URL,
    Connection,
    useGetConnection,
    useGetConnections,
} from "@voloiq/commercial-scheduling-api/v1";
import { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";

export const useConnectionOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetConnections();
    const { refetchDataWithResponseEnvelope } = useGetConnection();

    const fetchAllConnections = useCallback(
        (options: FetchAllResourceOptions<Connection>) => {
            const { page, size, sortingConfiguration, filterSet } = options;

            const filters =
                filterSet && filterSet?.filters.length > 0 ? { filter: serializeFilters(filterSet) } : undefined;

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

    const fetchConnection = useCallback(
        (resourceId: string) => {
            return refetchDataWithResponseEnvelope({ url: `${CONNECTION_BASE_URL}/${resourceId}` });
        },
        [refetchDataWithResponseEnvelope]
    );

    return { fetchAllConnections, fetchConnection };
};
