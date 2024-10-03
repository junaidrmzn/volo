import type { FilterSet } from "@voloiq/filter-panel";
import { serializeFilters, useGetAllService } from "@voloiq/service";
import type { ServiceOptions } from "@voloiq/service";
import type { Aircraft } from "./apiModels";

export type GetAllAircraftOptions = {
    filterSet?: FilterSet<Aircraft>;
    serviceOptionsOverride?: Partial<Pick<ServiceOptions, "options" | "params">>;
};

export const useGetAllAircrafts = (options?: GetAllAircraftOptions) => {
    const { filterSet, serviceOptionsOverride } = options ?? {};
    const {
        data: aircrafts,
        sendRequestWithResponseEnvelope: getAllAircrafts,
        error,
        state,
    } = useGetAllService<Aircraft>({
        route: "/aircraft",
        params: {
            limit: 100,
            orderBy: "productLine:asc",
            ...(filterSet && filterSet.filters.length > 0 ? { filter: serializeFilters(filterSet) } : undefined),
            ...serviceOptionsOverride?.params,
        },
        options: serviceOptionsOverride?.options,
    });

    return {
        aircrafts,
        getAllAircrafts,
        error,
        state,
    };
};
