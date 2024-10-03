import type { CrewMember, CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useGetCrewRolesQuery, useGetRegionsQuery } from "@voloiq/crew-management-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useCrewApiTranslation } from "../translations/useCrewApiTranslation";
import { useCrewMemberBulkEdit } from "./bulk-edit";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useGetSortingConfig } from "./filter/useGetSortingConfig";
import { useCrewMemberOverviewPage } from "./useCrewMemberOverviewPage";

export const useCrewMemberMachineConfig = () => {
    const { t } = useCrewApiTranslation();
    const { fetchAllCrewMembers, fetchCrewMember, deleteCrewMember, bulkEditCrewMember } = useCrewMemberOverviewPage();
    const { crewMemberBulkEditSchema } = useCrewMemberBulkEdit();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { getSortingConfig } = useGetSortingConfig();
    const { regions, isLoading: isLoadingRegion } = useGetRegionsQuery();
    const { crewRoles, isLoading: isLoadingCrewRoles } = useGetCrewRolesQuery();
    const canCreate = useIsAuthorizedTo(["create"], ["CrewMember"]);
    const canRead = useIsAuthorizedTo(["read"], ["CrewMember"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["CrewMember"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["CrewMember"]);

    return useMemo(() => {
        if (isLoadingRegion || isLoadingCrewRoles) return { isLoadingRegion, isLoadingCrewRoles };
        const config = new ResourceMachineConfigBuilder({
            canCreate,
            canRead,
            canUpdate,
            canDelete,
            getResourceName: () => t("crewMember.overview.heading"),
        })
            .withList<CrewMemberWithNames>({
                fetchAllResources: fetchAllCrewMembers,
                getListItemName: () => t("crewMember.overview.heading"),
                getListTitle: () => t("crewMember.overview.subheading"),
                getModuleTitle: () => t("crewMember.overview.heading"),
                pageSize: 10,
                getListAriaLabel: () => t("crewMember.overview.listLabel"),
            })
            .withAdd()
            .withEdit()
            .withBulkEdit<CrewMemberWithNames>({
                getBulkEditTitle: () => t("crewMember.overview.subheading"),
                bulkEditResource: bulkEditCrewMember,
                schema: crewMemberBulkEditSchema,
            })
            .withDelete<CrewMember>({
                deleteResource: deleteCrewMember,
                getDeleteTexts: () => ({
                    confirmationModal: {
                        headerText: t("generic.delete-modal.heading", { entityName: "crewMember" }),
                        bodyText: t("generic.delete-modal.body", { entityName: "crewMember" }),
                    },
                }),
            })
            .withPreview<CrewMemberWithNames>({
                fetchPreviewResource: fetchCrewMember,
                getPreviewTitle: () => t("crewMember.overview.heading"),
            })
            .withDetails<CrewMemberWithNames>({
                fetchDetailsResource: fetchCrewMember,
                getDetailsTitle: (crewMember) =>
                    t("crewMember.detail.heading", { name: `${crewMember.firstName} ${crewMember.surName}` }),
                checkIfResourceIsEditable: () => {
                    return {
                        isResourceEditable: canUpdate,
                    };
                },
            })
            .withFilterBar({ getAllFilters: () => getAllFilterProperties({ regions, crewRoles }), getSortingConfig })
            .build();
        return { config, isLoadingRegion, isLoadingCrewRoles };
    }, [
        canCreate,
        canDelete,
        canRead,
        canUpdate,
        crewRoles,
        deleteCrewMember,
        fetchAllCrewMembers,
        fetchCrewMember,
        getAllFilterProperties,
        getSortingConfig,
        isLoadingCrewRoles,
        isLoadingRegion,
        regions,
        t,
    ]);
};
