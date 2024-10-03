import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { TestPointGroup } from "@voloiq/flight-test-definition-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useTestPointMachineConfigTranslation } from "./translations/useTestPointMachineConfigTranslation";
import { useFetchAllTestPointGroups } from "./useFetchAllTestPointGroups";
import { useGetAllFilterProperties } from "./useGetAllFilterProperties";

export const useTestPointMachineConfig = () => {
    const { t } = useTestPointMachineConfigTranslation();
    const canCreate = useIsAuthorizedTo(["create"], ["TestPoint"]);
    const canRead = useIsAuthorizedTo(["read"], ["TestPoint"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["TestPoint"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["TestPoint"]);
    const { fetchAllTestPointGroups } = useFetchAllTestPointGroups();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const testPointMachineConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canDelete,
                canRead,
                canUpdate,
                getResourceName: () => t("Test Point"),
            })
                .withList<TestPointGroup>({
                    fetchAllResources: fetchAllTestPointGroups,
                    getModuleTitle: () => t("Flight Test").toUpperCase(),
                    getListTitle: () => t("Test Points"),
                    getListDescription: () => t("Description"),
                    usesNewNavigationConcept: isFeatureFlagEnabled("vte-1596"),
                    getListItemName: (testPointGroup) => testPointGroup.id,
                    pageSize: 100,
                })
                .withFilterBar({ getAllFilters: getAllFilterProperties })
                .build(),
        [
            canCreate,
            canDelete,
            canRead,
            canUpdate,
            fetchAllTestPointGroups,
            t,
            getAllFilterProperties,
            isFeatureFlagEnabled,
        ]
    );

    return { testPointMachineConfig };
};
