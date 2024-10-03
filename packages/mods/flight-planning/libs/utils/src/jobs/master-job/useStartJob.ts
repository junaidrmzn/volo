import { useQuery } from "react-query";
import type { QueryKey } from "react-query";
import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { getRetryInterval } from "../helpers";
import { MasterJobStatus } from "../types";

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
        const { data, headers } = await axiosInstance.post<ResponseEnvelope<MasterJobStatus>>(startJobUrl, null, {
            paramsSerializer,
            withCredentials: true,
        });
        return { jobIds: data.data?.jobIds, retryInterval: getRetryInterval(headers["retry-after"]) };
    };

    return useQuery({
        enabled,
        queryKey: ["jobs", ...jobKey],
        queryFn: () => startJob(),
        retry: false,
        refetchOnWindowFocus: false,
        onError: (error) => onError?.(error),
    });
};
