import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";
import { useCallback } from "react";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";
import { useDeleteCrewRole, useGetAllCrewRolesManual, useGetCrewRoleNew } from "../api-hooks/useCrewRoleService";

export const useCrewRoleOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetAllCrewRolesManual();
    const { refetchDataWithResponseEnvelope } = useGetCrewRoleNew();
    const { sendRequestById } = useDeleteCrewRole();

    const fetchAllCrewRoles = useCallback(
        (options: FetchAllResourceOptions<CrewRole>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet, { useIlikeOperator: true }) }
                        : undefined),
                    orderBy: sortingConfiguration
                        ? `${
                              sortingConfiguration.selectedOption
                          }:${sortingConfiguration.selectedOrder.toLocaleLowerCase()}`
                        : undefined,
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    const fetchCrewRole = useCallback(
        (resourceId: string) => refetchDataWithResponseEnvelope({ url: `crew-management/v1/crew-roles/${resourceId}` }),
        [refetchDataWithResponseEnvelope]
    );

    const deleteCrewRole = useCallback(
        (resourceId: string) => {
            return new Promise<void>((resolve, reject) => {
                sendRequestById(resourceId)
                    .then(() => resolve())
                    .catch(reject);
            });
        },
        [sendRequestById]
    );

    return {
        fetchAllCrewRoles,
        fetchCrewRole,
        deleteCrewRole,
    };
};
