import type { QueryKey } from "react-query";
import { useQuery, useQueryClient } from "react-query";
import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { getJobStatusInterval } from "../helpers";
import { Status } from "../types";

type UseToggleStatusType = {
    startJobUrl: string;
    jobKey: QueryKey;
    retryAttemptsOverride?: number;
    retryInterval: number;
    enabled: boolean;
    dependentQueryKey?: QueryKey;
    onError?: (error: unknown) => void;
    onSuccess?: () => void;
};

export const useGetJobStatus = (params: UseToggleStatusType) => {
    const {
        startJobUrl,
        enabled,
        jobKey,
        retryAttemptsOverride,
        retryInterval,
        dependentQueryKey,
        onError,
        onSuccess,
    } = params;
    const { axiosInstance } = useService();
    const queryClient = useQueryClient();
    const getJobInfo = async () => {
        try {
            const { data, headers } = await axiosInstance.get<ResponseEnvelope<Status>>(`${startJobUrl}/jobs/status`, {
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
        queryKey: ["jobs", ...jobKey, "status"],
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
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
