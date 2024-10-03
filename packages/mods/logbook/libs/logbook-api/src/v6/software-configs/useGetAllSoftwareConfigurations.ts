import type { FilterSet } from "@voloiq/filter-panel";
import { serializeFilters, useGetAllService } from "@voloiq/service";
import type { ServiceOptions } from "@voloiq/service";
import type { SoftwareConfig } from "./apiModels";

export type UseGetAllSoftwareConfigurationsOptions = {
    filterSet?: FilterSet<SoftwareConfig>;
    serviceOptionsOverride?: Partial<Pick<ServiceOptions, "options" | "params">>;
};

export const useGetAllSoftwareConfigurations = (options?: UseGetAllSoftwareConfigurationsOptions) => {
    const { filterSet, serviceOptionsOverride } = options ?? {};
    const {
        data: softwareConfigurations,
        sendRequestWithResponseEnvelope: getAllSoftwareConfigurations,
        error,
        state,
    } = useGetAllService<SoftwareConfig>({
        route: "/software-configs",
        params: {
            limit: 100,
            orderBy: "createTime:asc",
            ...(filterSet && filterSet.filters.length > 0 ? { filter: serializeFilters(filterSet) } : undefined),
            ...serviceOptionsOverride?.params,
        },
        options: serviceOptionsOverride?.options,
    });

    return {
        softwareConfigurations,
        getAllSoftwareConfigurations,
        error,
        state,
    };
};
