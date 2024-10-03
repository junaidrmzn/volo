import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FlightTestDefinition } from "@voloiq/flight-test-definition-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useFetchAllDefinitions } from "./fetch-all-definitions/useFetchAllDefinitions";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useDefinitionMachineConfigTranslation } from "./translations/useDefinitionMachineConfigTranslation";

export const useDefinitionMachineConfig = () => {
    const { t } = useDefinitionMachineConfigTranslation();
    const canCreate = useIsAuthorizedTo(["create"], ["FlightTestDefinition"]);
    const canRead = useIsAuthorizedTo(["read"], ["FlightTestDefinition"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["FlightTestDefinition"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["FlightTestDefinition"]);
    const { fetchAllDefinitions } = useFetchAllDefinitions();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const definitionMachineConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canDelete,
                canRead,
                canUpdate,
                getResourceName: () => t("Definition"),
            })
                .withList<FlightTestDefinition>({
                    fetchAllResources: fetchAllDefinitions,
                    getListTitle: () =>
                        isFeatureFlagEnabled("vte-1596") ? t("Flight Test Definitions (FTDs)") : t("Definitions"),
                    getListDescription: () => t("Description"),
                    usesNewNavigationConcept: isFeatureFlagEnabled("vte-1596"),
                    getModuleTitle: () => t("Flight Test").toUpperCase(),
                    getListItemName: (definition) => definition.title,
                    sortingOrder: "ASC",
                    pageSize: 100,
                })

                .withAdd()

                .withSort({
                    sortingOptions: [
                        {
                            label: t("sortingPanel.ftdId"),
                            id: "ftdId",
                        },
                        {
                            label: t("sortingPanel.dateOption"),
                            id: "createTime",
                        },
                        {
                            label: t("sortingPanel.title"),
                            id: "title",
                        },
                        {
                            label: t("sortingPanel.ata"),
                            id: "ata",
                        },
                    ],
                })
                .withFilterBar({ getAllFilters: getAllFilterProperties })
                .build(),
        [canCreate, canDelete, canRead, canUpdate, fetchAllDefinitions, t, getAllFilterProperties, isFeatureFlagEnabled]
    );

    return { definitionMachineConfig };
};
