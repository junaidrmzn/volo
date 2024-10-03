import type { FilterSet } from "@voloiq/filter-panel";
import { serializeFilters, useGetAllService } from "@voloiq/service";
import type { ServiceOptions } from "@voloiq/service";
import type { Log } from "./apiModels";

export type UseGetAllLogsOptions = {
    filterSet?: FilterSet<Log>;
    serviceOptionsOverride?: Partial<Pick<ServiceOptions, "options" | "params">>;
};

export const useGetAllLogs = (options?: UseGetAllLogsOptions) => {
    const { filterSet, serviceOptionsOverride } = options || {};
    const {
        data: logsData,
        sendRequestWithResponseEnvelope: getAllLogs,
        error,
        state,
    } = useGetAllService<Log>({
        route: "/logs",
        params: {
            limit: 100,
            orderBy: "date:desc",
            ...(filterSet && filterSet.filters.length > 0 ? { filter: serializeFilters(filterSet) } : undefined),
            ...serviceOptionsOverride?.params,
        },
        options: serviceOptionsOverride?.options,
    });

    return {
        logsData,
        getAllLogs,
        error,
        state,
    };
};
