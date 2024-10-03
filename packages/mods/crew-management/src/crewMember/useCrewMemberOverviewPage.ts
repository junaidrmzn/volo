import type { CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import { useCallback } from "react";
import { useBulkEditCrewMember } from "@voloiq/crew-management-api/v1";
import type { FilterSet } from "@voloiq/filter-panel";
import type { BulkEditResourceOptions, FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";
import {
    useDeleteCrewMember,
    useGetAllCrewMembersManual,
    useGetCrewMemberOverview,
} from "../api-hooks/useCrewMemberService";

const extractRegionAndRolesWithFilter = (filterString?: FilterSet<Event>) => {
    const roleFilter = filterString?.filters.find((filter) => filter.propertyName === "roleAssignments");
    const regionFilter = filterString?.filters.find((filter) => filter.propertyName === "homeBase");
    return {
        ...(roleFilter && {
            roles:
                roleFilter.type === "multiSelect"
                    ? roleFilter.values.map((option) => option.value).join(",")
                    : undefined,
        }),
        ...(regionFilter && { regionId: regionFilter.type === "select" ? regionFilter.value.value : undefined }),
    };
};

const deleteRegionAndRolesFilter = (filterString?: FilterSet<Event>): FilterSet<Event> | undefined => {
    if (filterString) {
        const filter = JSON.parse(JSON.stringify(filterString));
        if (filter) {
            for (const [index, item] of filter?.filters.entries()) {
                if (item.propertyName === "roleAssignments") filter?.filters.splice(index, 1);
            }
            for (const [index, item] of filter?.filters.entries()) {
                if (item.propertyName === "homeBase") filter?.filters.splice(index, 1);
            }
        }
        return filter;
    }
    return undefined;
};

export const useCrewMemberOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetAllCrewMembersManual();
    const { refetchDataWithResponseEnvelope } = useGetCrewMemberOverview();
    const { sendCrewMemberBulkEditRequest } = useBulkEditCrewMember();
    const { sendRequestById } = useDeleteCrewMember();

    const fetchAllCrewMembers = useCallback(
        (options: FetchAllResourceOptions<CrewMemberWithNames>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            const crewMemberFilter = deleteRegionAndRolesFilter(filterSet);

            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...extractRegionAndRolesWithFilter(filterSet),
                    ...(crewMemberFilter && crewMemberFilter.filters.length > 0
                        ? { filter: serializeFilters(crewMemberFilter, { useIlikeOperator: true }) }
                        : undefined),
                    orderBy: sortingConfiguration
                        ? `${sortingConfiguration.selectedOption}:${sortingConfiguration.selectedOrder.toLowerCase()}`
                        : undefined,
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    const fetchCrewMember = useCallback(
        (resourceId: string) =>
            refetchDataWithResponseEnvelope({ url: `crew-management/v1/crew-members/with-names/${resourceId}` }),
        [refetchDataWithResponseEnvelope]
    );

    const deleteCrewMember = useCallback(
        (resourceId: string) => {
            return new Promise<void>((resolve, reject) => {
                sendRequestById(resourceId)
                    .then(() => resolve())
                    .catch(reject);
            });
        },
        [sendRequestById]
    );

    const bulkEditCrewMember = useCallback(
        (options: BulkEditResourceOptions<CrewMemberWithNames>) => {
            const { filterSet, data } = options;
            return sendCrewMemberBulkEditRequest({
                params: {
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet, { useIlikeOperator: true }) }
                        : undefined),
                },
                data,
            });
        },
        [sendCrewMemberBulkEditRequest]
    );

    return {
        fetchAllCrewMembers,
        fetchCrewMember,
        deleteCrewMember,
        bulkEditCrewMember,
    };
};
