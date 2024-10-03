import type { FilterSet } from "@voloiq/filter-panel";
import { serializeFilters, useGetAllService } from "@voloiq/service";
import type { ServiceOptions } from "@voloiq/service";
import type { CrewMember } from "./apiModels";

export type UseGetAllCrewMembersOptions = {
    filterSet?: FilterSet<CrewMember>;
    serviceOptionsOverride?: Partial<Pick<ServiceOptions, "options" | "params">>;
};

export const useGetAllCrewMembers = (options?: UseGetAllCrewMembersOptions) => {
    const { filterSet, serviceOptionsOverride } = options ?? {};
    const {
        data: crewMembers,
        sendRequestWithResponseEnvelope: getAllCrewMembers,
        error,
        state,
    } = useGetAllService<CrewMember>({
        route: "/crew-members",
        params: {
            limit: 100,
            orderBy: "firstName:asc",
            ...(filterSet && filterSet.filters.length > 0 ? { filter: serializeFilters(filterSet) } : undefined),
            ...serviceOptionsOverride?.params,
        },
        options: serviceOptionsOverride?.options,
    });

    return {
        crewMembers,
        getAllCrewMembers,
        error,
        state,
    };
};
