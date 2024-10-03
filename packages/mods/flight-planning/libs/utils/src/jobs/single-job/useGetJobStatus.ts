import type { QueryKey } from "react-query";
import { useQuery, useQueryClient } from "react-query";
import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { getJobStatusInterval } from "../helpers";
import { JobStatus } from "../types";

type UseToggleStatusType = {
    jobKey: QueryKey;
    jobId?: string | null;
    retryAttemptsOverride?: number;
    retryInterval: number;
    enabled: boolean;
    dependentQueryKey?: QueryKey;
    onError?: (error: unknown) => void;
    onSuccess?: () => void;
};

export const useGetJobStatus = (params: UseToggleStatusType) => {
    const { enabled, jobKey, jobId, retryAttemptsOverride, retryInterval, dependentQueryKey, onError, onSuccess } =
        params;
    const { axiosInstance, baseUrl } = useService();
    const queryClient = useQueryClient();

    const getJobInfo = async () => {
        try {
            const { data, headers } = await axiosInstance.get<ResponseEnvelope<JobStatus>>(`${baseUrl}/jobs/${jobId}`, {
                paramsSerializer,
                withCredentials: true,
            });

            return {
                status: data.data?.status,
                resourceUrl: headers.location,
                retryInterval,
            };
        } catch {
            return { error: true };
        }
    };

    return useQuery({
        enabled,
        queryKey: ["jobs", ...jobKey, jobId],
        queryFn: () =>
            getJobStatusInterval({
                jobFunction: getJobInfo,
                initialInterval: retryInterval,
                maxRetries: retryAttemptsOverride,
            }),
        onSuccess: async () => {
            if (dependentQueryKey) await queryClient.invalidateQueries(dependentQueryKey);
            onSuccess?.();
        },
        onError: (error) => onError?.(error),
        staleTime: Number.POSITIVE_INFINITY, // cache can only manually invalidated
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
