import type { FilterSet } from "@voloiq/filter-panel";
import { serializeFilters, useGetAllService } from "@voloiq/service";
import type { ServiceOptions } from "@voloiq/service";
import type { Location } from "./apiModels";

export type UseGetAllLocationsOptions = {
    filterSet?: FilterSet<Location>;
    serviceOptionsOverride?: Partial<Pick<ServiceOptions, "options" | "params">>;
};

export const useGetAllLocations = (options?: UseGetAllLocationsOptions) => {
    const { filterSet, serviceOptionsOverride } = options ?? {};
    const {
        data: locations,
        sendRequestWithResponseEnvelope: getAllLocations,
        error,
        state,
    } = useGetAllService<Location>({
        route: "/locations",
        params: {
            limit: 100,
            orderBy: "icaoCode:asc",
            ...(filterSet && filterSet.filters.length > 0 ? { filter: serializeFilters(filterSet) } : undefined),
            ...serviceOptionsOverride?.params,
        },
        options: serviceOptionsOverride?.options,
    });

    return {
        locations,
        getAllLocations,
        error,
        state,
    };
};
