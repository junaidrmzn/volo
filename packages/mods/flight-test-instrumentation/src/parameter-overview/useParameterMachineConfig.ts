import type { Parameter } from "@voloiq-typescript-api/fti-types";
import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useFilters } from "./filter/filter-query/useFilters";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useFtiOverviewTranslation } from "./translations/useFtiTranslation";
import { useOverviewPage } from "./useOverviewPage";

export const useParameterMachineConfig = () => {
    const { t } = useFtiOverviewTranslation();
    const { fetchAllParameter, fetchParameter } = useOverviewPage();
    const canCreate = useIsAuthorizedTo(["create"], ["Parameter"]);
    const canRead = useIsAuthorizedTo(["read"], ["Parameter"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["Parameter"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["Parameter"]);
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const { aircrafts, workGroups, aircraftZones, parameterSources, ataIspecs, sensorTypes, units, isFilterLoading } =
        useFilters();

    const parameterMachineConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canRead,
                canUpdate,
                canDelete,
                getResourceName: () => t("resourceLabel"),
            })
                .withList<Parameter>({
                    fetchAllResources: fetchAllParameter,
                    getListItemName: (parameter) => t("list.listItemName", { parameterId: parameter.id }),
                    getListTitle: () =>
                        isFeatureFlagEnabled("vte-1596")
                            ? t("Flight Test Instrumentation (FTI) Parameters")
                            : t("header.title"),
                    getListDescription: () => t("Description"),
                    usesNewNavigationConcept: isFeatureFlagEnabled("vte-1596"),
                    getModuleTitle: () => t("moduleName"),
                    pageSize: 100,
                    getListAriaLabel: () => t("list.listAriaLabel"),
                })
                .withPreview<Parameter>({
                    fetchPreviewResource: fetchParameter,
                    getPreviewTitle: (parameter) => (parameter.ftiCode ? parameter.ftiCode : t("ftiParameter")),
                })
                .withAdd()
                .withEdit()
                .withFilterBar({
                    getAllFilters: () =>
                        getAllFilterProperties({
                            aircrafts,
                            workGroups,
                            aircraftZones,
                            parameterSources,
                            ataIspecs,
                            sensorTypes,
                            units,
                        }),
                })
                .build(),
        [
            aircraftZones,
            aircrafts,
            ataIspecs,
            canCreate,
            canDelete,
            canRead,
            canUpdate,
            fetchAllParameter,
            fetchParameter,
            getAllFilterProperties,
            parameterSources,
            sensorTypes,
            t,
            units,
            workGroups,
        ]
    );

    return { parameterMachineConfig, isFilterLoading };
};
