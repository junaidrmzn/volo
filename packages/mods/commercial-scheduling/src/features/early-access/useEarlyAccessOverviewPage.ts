import { useCallback } from "react";
import { EarlyAccess, useGetEarlyAccesses } from "@voloiq/commercial-scheduling-api/v1";
import { FetchAllResourceOptions } from "@voloiq/resource-overview";

export const useEarlyAccessOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetEarlyAccesses();

    const fetchAllEarlyAccesses = useCallback(
        (options: FetchAllResourceOptions<EarlyAccess>) => {
            const { page, size } = options;

            return sendRequestWithResponseEnvelope({
                params: { size, page },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    return { fetchAllEarlyAccesses };
};
