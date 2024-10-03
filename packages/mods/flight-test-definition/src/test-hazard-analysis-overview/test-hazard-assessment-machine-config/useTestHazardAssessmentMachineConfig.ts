import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useTestHazardAssessmentMachineConfigTranslation } from "../translations/useTestHazardAssessmentMachineConfigTranslation";
import { useTestHazardsAssessmentOverview } from "./test-hazard-assessment-overview/useTestHazardsAssessmentOverview";

export const useTestHazardAssessmentMachineConfig = () => {
    const canCreate = useIsAuthorizedTo(["create"], ["TestHazard"]);
    const canRead = useIsAuthorizedTo(["read"], ["TestHazard"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["TestHazard"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["TestHazard"]);
    const { t } = useTestHazardAssessmentMachineConfigTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const { fetchAllTestHazards, fetchTestHazard } = useTestHazardsAssessmentOverview();

    const testHazardMachineConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canDelete,
                canRead,
                canUpdate,
                getResourceName: () => t("Test Hazard"),
            })
                .withList<TestHazardAssessment>({
                    fetchAllResources: fetchAllTestHazards,
                    getListTitle: () => t("Test Hazard"),
                    getListDescription: () => t("Description"),
                    usesNewNavigationConcept: isFeatureFlagEnabled("vte-1596"),
                    getModuleTitle: () => t("Resources").toUpperCase(),
                    getListItemName: (testHazard) => testHazard.hazard,
                    sortingOrder: "ASC",
                    pageSize: 100,
                })
                .withPreview<TestHazardAssessment>({
                    fetchPreviewResource: fetchTestHazard,
                    getPreviewTitle: () => t("preview.heading"),
                })
                .withAdd()
                .withEdit()
                .build(),
        [canCreate, canDelete, canRead, canUpdate, fetchAllTestHazards, fetchTestHazard, t]
    );
    return { testHazardMachineConfig };
};
