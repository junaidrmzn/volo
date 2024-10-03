import type { QueryKey } from "react-query";
import { useQueryClient } from "react-query";
import { useGetJobStatus } from "./useGetJobStatus";
import { useStartJob } from "./useStartJob";

type UseJobQueueType = {
    enabled?: boolean;
    jobKey: QueryKey;
    startJobUrl: string;
    retryAttemptsOverride?: number;
    retryIntervalOverride?: number;
    dependentQueryKey?: QueryKey;
    onError?: (error: unknown) => void;
    onSuccess?: () => void;
};
export const useMasterJobQueue = (params: UseJobQueueType) => {
    const queryClient = useQueryClient();
    const {
        enabled = true,
        jobKey,
        startJobUrl,
        retryAttemptsOverride,
        retryIntervalOverride,
        dependentQueryKey,
        onError,
        onSuccess,
    } = params;

    const startJobQuery = useStartJob({
        enabled,
        jobKey,
        startJobUrl,
        onError,
    });

    const toggleJobQuery = useGetJobStatus({
        startJobUrl,
        jobKey,
        retryAttemptsOverride,
        retryInterval: retryIntervalOverride || startJobQuery.data?.retryInterval || 2000,
        enabled: enabled && startJobQuery.isSuccess,
        dependentQueryKey,
        onError,
        onSuccess,
    });

    return {
        isFetching: startJobQuery.isFetching || toggleJobQuery.isFetching,
        isError: toggleJobQuery.isError,
        isSuccess: toggleJobQuery.isSuccess,
        invalidate: async () => {
            await queryClient.invalidateQueries(["jobs", ...jobKey]);
            await queryClient.invalidateQueries(["jobs", ...jobKey, "status"]);
        },
        removeQueries: () => {
            queryClient.removeQueries(["jobs", ...jobKey]);
            queryClient.removeQueries(["jobs", ...jobKey, "status"]);
        },
    };
};
