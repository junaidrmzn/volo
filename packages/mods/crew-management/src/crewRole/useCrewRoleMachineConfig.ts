import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";
import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useCrewApiTranslation } from "../translations/useCrewApiTranslation";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useGetSortingConfig } from "./filter/useGetSortingConfig";
import { useCrewRoleOverviewPage } from "./useCrewRoleOverviewPage";

export const useCrewRoleMachineConfig = () => {
    const { t } = useCrewApiTranslation();
    const { fetchAllCrewRoles, fetchCrewRole, deleteCrewRole } = useCrewRoleOverviewPage();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { getSortingConfig } = useGetSortingConfig();
    const canCreate = useIsAuthorizedTo(["create"], ["CrewRole"]);
    const canRead = useIsAuthorizedTo(["read"], ["CrewRole"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["CrewRole"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["CrewRole"]);

    const config = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canRead,
                canUpdate,
                canDelete,
                getResourceName: () => t("crewRole.overview.subheading"),
            })
                .withList<CrewRole>({
                    fetchAllResources: fetchAllCrewRoles,
                    getListItemName: () => t("crewRole.overview.subheading"),
                    getListTitle: () => t("crewRole.model.roleKey"),
                    getModuleTitle: () => t("crewRole.model.roleKey"),
                    pageSize: 10,
                    getListAriaLabel: () => t("crewRole.overview.listLabel"),
                })
                .withAdd()
                .withEdit()
                .withDelete<CrewRole>({
                    deleteResource: deleteCrewRole,
                    getDeleteTexts: () => ({
                        confirmationModal: {
                            headerText: t("generic.delete-modal.heading", { entityName: "region" }),
                            bodyText: t("generic.delete-modal.body", { entityName: "region" }),
                        },
                    }),
                })
                .withPreview<CrewRole>({
                    fetchPreviewResource: fetchCrewRole,
                    getPreviewTitle: () => t("crewRole.overview.preview"),
                })
                .withFilterBar({ getAllFilters: getAllFilterProperties, getSortingConfig })
                .build(),
        [
            canCreate,
            canDelete,
            canRead,
            canUpdate,
            deleteCrewRole,
            fetchAllCrewRoles,
            fetchCrewRole,
            getAllFilterProperties,
            getSortingConfig,
            t,
        ]
    );

    return { config };
};
