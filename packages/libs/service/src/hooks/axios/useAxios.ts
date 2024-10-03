import type { AxiosRequestConfig } from "axios";
import type { Options, UseAxiosResult } from "axios-hooks";
import { makeUseAxios as useAxiosFactory } from "axios-hooks";
import { useService } from "../context/useService";
import { useTraceId } from "./useTraceId";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAxios = <TResponse = any, TBody = any, TError = any>(
    config: AxiosRequestConfig<TBody> | string,
    options?: Options
): [...UseAxiosResult<TResponse, TBody, TError>, string] => {
    const { axiosInstance, logging } = useService();
    const { traceId } = useTraceId(logging);

    if (typeof config !== "string" && config.baseURL?.startsWith(BACKEND_BASE_URL)) {
        axiosInstance.defaults.headers.common["X-VOLO-TRACEID"] = traceId;
    }

    return [
        ...useAxiosFactory({
            axios: axiosInstance,
        })(config, options),
        traceId,
    ];
};
