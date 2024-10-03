import { useMemo } from "react";
import type { Aircraft } from "@voloiq/aircraft-management-api/v1";
import { useGetAircraftTypesQuery, useGetVertiportsQuery } from "@voloiq/aircraft-management-api/v1";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useAircraftBulkEdit } from "./bulk-edit";
import { useGetAllFilterProperties } from "./filters/useGetAllFilterProperties";
import { useGetSortingConfig } from "./filters/useGetSortingConfig";
import { useAircraftTranslation } from "./translations/useAircraftTranslation";
import { useAircraftOverviewPage } from "./useAircraftOverviewPage";

export const useAircraftMachineConfig = () => {
    const { t } = useAircraftTranslation();
    const { fetchAllAircrafts, fetchAircraft, deleteAircraft, bulkEditAircraft } = useAircraftOverviewPage();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { getSortingConfig } = useGetSortingConfig();
    const { vertiports, isLoading: isLoadingVertiport } = useGetVertiportsQuery();
    const { aircraftTypes, isLoading: isLoadingAircraftType } = useGetAircraftTypesQuery();
    const { aircraftBulkEditSchema } = useAircraftBulkEdit();

    const canCreate = useIsAuthorizedTo(["create"], ["Aircraft"]);
    const canRead = useIsAuthorizedTo(["read"], ["Aircraft"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["Aircraft"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["Aircraft"]);

    return useMemo(() => {
        if (isLoadingVertiport || isLoadingAircraftType) return { isLoadingVertiport, isLoadingAircraftType };
        const config = new ResourceMachineConfigBuilder({
            canCreate,
            canRead,
            canUpdate,
            canDelete,
            getResourceName: () => t("overview.title-primary"),
        })
            .withList<Aircraft>({
                fetchAllResources: fetchAllAircrafts,
                getListItemName: () => t("overview.title-secondary"),
                getListTitle: () => t("model.name"),
                getModuleTitle: () => t("overview.title-primary"),
                pageSize: 10,
                getListAriaLabel: () => t("overview.title-primary"),
            })
            .withAdd()
            .withPreview<Aircraft>({
                fetchPreviewResource: fetchAircraft,
                getPreviewTitle: () => t("preview.heading"),
            })
            .withDetails<Aircraft>({
                fetchDetailsResource: fetchAircraft,
                getDetailsTitle: (aircraft) =>
                    t("detail.heading aircraft", {
                        msn: aircraft.msn,
                    }),
                checkIfResourceIsEditable: () => {
                    return {
                        isResourceEditable: canUpdate,
                    };
                },
            })
            .withEdit()
            .withBulkEdit<Aircraft>({
                getBulkEditTitle: () => t("model.name"),
                bulkEditResource: bulkEditAircraft,
                schema: aircraftBulkEditSchema,
            })
            .withDelete<Aircraft>({
                deleteResource: deleteAircraft,
                getDeleteTexts: () => ({
                    confirmationModal: {
                        headerText: t("deleteModal.heading", { entityName: "aircraft" }),
                        bodyText: t("deleteModal.body", { entityName: "aircraft" }),
                    },
                }),
            })
            .withFilterBar({
                getAllFilters: () => getAllFilterProperties({ vertiports, aircraftTypes }),
                getSortingConfig,
            })
            .build();
        return { config, isLoadingAircraftType, isLoadingVertiport };
    }, [
        isLoadingVertiport,
        isLoadingAircraftType,
        canCreate,
        canRead,
        canUpdate,
        canDelete,
        fetchAllAircrafts,
        fetchAircraft,
        bulkEditAircraft,
        aircraftBulkEditSchema,
        deleteAircraft,
        getSortingConfig,
        t,
        getAllFilterProperties,
        vertiports,
        aircraftTypes,
    ]);
};
