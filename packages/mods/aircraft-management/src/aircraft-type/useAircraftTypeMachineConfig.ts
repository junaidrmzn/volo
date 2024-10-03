import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useAircraftTranslation } from "../aircraft/translations/useAircraftTranslation";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { useAircraftTypeBulkEdit } from "./bulk-edit";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useGetSortingConfig } from "./filter/useGetSortingConfig";
import { useAircraftTypeOverviewPage } from "./useAircraftTypeOverviewPage";

export const useAircraftTypeMachineConfig = () => {
    const { t } = useResourcesTranslation();
    const { t: aircraftTranslation } = useAircraftTranslation();
    const { fetchAllAircraftTypes, fetchAircraftType, bulkEditAircraftType } = useAircraftTypeOverviewPage();
    const { aircraftTypeBulkEditSchema, isLoadingProductLines } = useAircraftTypeBulkEdit();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { getSortingConfig } = useGetSortingConfig();
    const canCreate = useIsAuthorizedTo(["create"], ["AircraftType"]);
    const canRead = useIsAuthorizedTo(["read"], ["AircraftType"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["AircraftType"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["AircraftType"]);

    return useMemo(() => {
        if (isLoadingProductLines) return { isLoadingProductLines };

        const machineConfig = new ResourceMachineConfigBuilder({
            canCreate,
            canRead,
            canUpdate,
            canDelete,
            getResourceName: () => t("aircraft-type.overview.subheading"),
        })
            .withList<AircraftType>({
                fetchAllResources: fetchAllAircraftTypes,
                getListItemName: () => t("aircraft-type.overview.heading"),
                getListTitle: () => t("aircraft-type.overview.subheading"),
                getModuleTitle: () => t("aircraft-type.overview.heading"),
                pageSize: 10,
                getListAriaLabel: () => t("aircraft-type.overview.subheading"),
            })
            .withPreview<AircraftType>({
                fetchPreviewResource: fetchAircraftType,
                getPreviewTitle: (aircraftType) => aircraftType.name,
            })
            .withAdd()
            .withEdit()
            .withBulkEdit<AircraftType>({
                getBulkEditTitle: () => t("aircraft-type.overview.subheading"),
                bulkEditResource: bulkEditAircraftType,
                schema: aircraftTypeBulkEditSchema,
            })
            .withDetails<AircraftType>({
                fetchDetailsResource: fetchAircraftType,
                getDetailsTitle: (aircraftType) =>
                    aircraftTranslation("detail.heading aircrafttype", {
                        name: aircraftType.name,
                    }),
                checkIfResourceIsEditable: () => {
                    return {
                        isResourceEditable: canUpdate,
                    };
                },
            })
            .withFilterBar({ getAllFilters: getAllFilterProperties, getSortingConfig })
            .build();

        return { isLoadingProductLines, machineConfig };
    }, [
        isLoadingProductLines,
        aircraftTranslation,
        aircraftTypeBulkEditSchema,
        bulkEditAircraftType,
        canCreate,
        canDelete,
        canRead,
        canUpdate,
        fetchAircraftType,
        fetchAllAircraftTypes,
        getAllFilterProperties,
        getSortingConfig,
        t,
    ]);
};
