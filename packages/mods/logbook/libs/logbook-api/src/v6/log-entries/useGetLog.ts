import { useGetService } from "@voloiq/service";
import type { ServiceOptions } from "@voloiq/service";
import type { Log } from "./apiModels";

export type UseGetLogOptions = {
    logId?: string;
    serviceOptionsOverride?: Partial<Pick<ServiceOptions, "options" | "params">>;
};
export const useGetLog = (options?: UseGetLogOptions) => {
    const { logId, serviceOptionsOverride } = options || {};
    const {
        data: log,
        refetchDataWithResponseEnvelope: getLog,
        error,
        state,
    } = useGetService<Log>({
        route: "/logs",
        resourceId: logId ?? "",
        params: serviceOptionsOverride?.params,
        options: serviceOptionsOverride?.options,
    });
    return { log, getLog, error, state };
};
