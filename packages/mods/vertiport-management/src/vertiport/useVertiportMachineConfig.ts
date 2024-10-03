import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { Vertiport, useGetRegionsQuery, useGetServicesQuery } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../translations/useVertiportTranslation";
import { useVertiportBulkEdit } from "./bulk-edit";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useGetSortingConfig } from "./filter/useGetSortingConfig";
import { useVertiportOverviewPage } from "./useVertiportOverviewPage";

export const useVertiportMachineConfig = () => {
    const { t } = useVertiportTranslation();
    const { fetchAllVertiports, fetchVertiport, deleteVertiport, bulkEditVertiport } = useVertiportOverviewPage();
    const { vertiportBulkEditSchema } = useVertiportBulkEdit();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { getSortingConfig } = useGetSortingConfig();

    const { regions, isLoading: isLoadingRegion } = useGetRegionsQuery();
    const { services, isLoading: isLoadingService } = useGetServicesQuery();
    const canCreate = useIsAuthorizedTo(["create"], ["Vertiport"]);
    const canRead = useIsAuthorizedTo(["read"], ["Vertiport"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["Vertiport"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["Vertiport"]);

    return useMemo(() => {
        if (isLoadingRegion || isLoadingService) return { isLoadingRegion, isLoadingService };
        const config = new ResourceMachineConfigBuilder({
            canCreate,
            canRead,
            canUpdate,
            canDelete,
            getResourceName: () => t("vertiport.overview.subheading"),
        })
            .withList<Vertiport>({
                fetchAllResources: fetchAllVertiports,
                getListItemName: () => t("vertiport.overview.heading"),
                getListTitle: () => t("vertiport.overview.subheading"),
                getModuleTitle: () => t("vertiport.overview.heading"),
                pageSize: 10,
                getListAriaLabel: () => t("vertiport.overview.listLabel"),
                sortingOrder: "ASC",
            })
            .withAdd()
            .withEdit()
            .withBulkEdit<Vertiport>({
                getBulkEditTitle: () => t("vertiport.overview.subheading"),
                bulkEditResource: bulkEditVertiport,
                schema: vertiportBulkEditSchema,
            })
            .withDelete<Vertiport>({
                deleteResource: deleteVertiport,
                getDeleteTexts: () => ({
                    confirmationModal: {
                        headerText: t("generic.delete-modal.heading", { entityName: "vertiport" }),
                        bodyText: t("generic.delete-modal.body", { entityName: "vertiport" }),
                    },
                }),
            })
            .withPreview<Vertiport>({
                fetchPreviewResource: fetchVertiport,
                getPreviewTitle: () => t("vertiport.preview.heading"),
            })
            .withDetails<Vertiport>({
                fetchDetailsResource: fetchVertiport,
                getDetailsTitle: (vertiport) =>
                    t("vertiport.detail.heading", {
                        name: vertiport?.name,
                        code: vertiport?.code,
                    }),
                checkIfResourceIsEditable: () => {
                    return {
                        isResourceEditable: canUpdate,
                    };
                },
            })
            .withFilterBar({ getAllFilters: () => getAllFilterProperties({ regions, services }), getSortingConfig })
            .build();
        return { config, isLoadingRegion, isLoadingService };
    }, [
        canCreate,
        canDelete,
        canRead,
        canUpdate,
        deleteVertiport,
        fetchAllVertiports,
        fetchVertiport,
        getAllFilterProperties,
        getSortingConfig,
        isLoadingRegion,
        isLoadingService,
        regions,
        services,
        t,
    ]);
};
