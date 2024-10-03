import { useQuery } from "react-query";
import type { QueryKey } from "react-query";
import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { getRetryInterval } from "../helpers";
import { JobStatus } from "../types";

type UseStartJobProps = {
    startJobUrl: string;
    enabled?: boolean;
    jobKey: QueryKey;
    onError?: (error: unknown) => void;
};

export const useStartJob = (params: UseStartJobProps) => {
    const { enabled, startJobUrl, jobKey, onError } = params;
    const { axiosInstance } = useService();

    const startJob = async () => {
        const { data, headers } = await axiosInstance.post<ResponseEnvelope<JobStatus>>(startJobUrl, null, {
            paramsSerializer,
            withCredentials: true,
        });
        return { jobId: data.data?.jobId, retryInterval: getRetryInterval(headers["retry-after"]) };
    };

    return useQuery({
        enabled,
        queryKey: ["jobs", ...jobKey],
        queryFn: () => startJob(),
        staleTime: Number.POSITIVE_INFINITY, // cache can only manually invalidate
        retry: false,
        refetchOnWindowFocus: false,
        onError: (error) => onError?.(error),
    });
};
