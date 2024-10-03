import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import type { Region } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../translations/useVertiportTranslation";
import { useRegionBulkEdit } from "./bulk-edit";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useGetSortingConfig } from "./filter/useGetSortingConfig";
import { useRegionOverviewPage } from "./useRegionOverviewPage";

export const useRegionMachineConfig = () => {
    const { t } = useVertiportTranslation();
    const { fetchAllRegions, fetchRegion, deleteRegion, bulkEditRegion } = useRegionOverviewPage();
    const { regionBulkEditSchema } = useRegionBulkEdit();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { getSortingConfig } = useGetSortingConfig();

    const canCreate = useIsAuthorizedTo(["create"], ["Region"]);
    const canRead = useIsAuthorizedTo(["read"], ["Region"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["Region"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["Region"]);

    const config = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canRead,
                canUpdate,
                canDelete,
                getResourceName: () => t("region.overview.subheading"),
            })
                .withList<Region>({
                    fetchAllResources: fetchAllRegions,
                    getListItemName: () => t("region.overview.heading"),
                    getListTitle: () => t("region.overview.subheading"),
                    getModuleTitle: () => t("region.overview.heading"),
                    pageSize: 10,
                    getListAriaLabel: () => t("region.overview.listLabel"),
                    sortingOrder: "ASC",
                })
                .withAdd()
                .withEdit()
                .withBulkEdit<Region>({
                    getBulkEditTitle: () => t("region.overview.subheading"),
                    bulkEditResource: bulkEditRegion,
                    schema: regionBulkEditSchema,
                })
                .withDelete<Region>({
                    deleteResource: deleteRegion,
                    getDeleteTexts: () => ({
                        confirmationModal: {
                            headerText: t("generic.delete-modal.heading", { entityName: "region" }),
                            bodyText: t("generic.delete-modal.body", { entityName: "region" }),
                        },
                    }),
                })
                .withPreview<Region>({
                    fetchPreviewResource: fetchRegion,
                    getPreviewTitle: () => t("region.preview.heading"),
                })
                .withFilterBar({ getAllFilters: getAllFilterProperties, getSortingConfig })
                .build(),
        [
            canCreate,
            canDelete,
            canRead,
            canUpdate,
            deleteRegion,
            fetchAllRegions,
            fetchRegion,
            bulkEditRegion,
            getAllFilterProperties,
            getSortingConfig,
            t,
        ]
    );

    return { config };
};
