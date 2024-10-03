import { Icon } from "@volocopter/design-library-react";
import React from "react";
import { TestHazardAssessment, useSoftDeleteTestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { ResourceOverview } from "@voloiq/resource-overview";
import { useTestHazardAssessmentMachineConfigTranslation } from "./translations/useTestHazardAssessmentMachineConfigTranslation";

export type TestHazardAssessmentSoftDeleteButtonProps = {
    testHazard: TestHazardAssessment;
    reloadOverview: () => void;
};

export const TestHazardAssessmentSoftDeleteButton = (props: TestHazardAssessmentSoftDeleteButtonProps) => {
    const { testHazard, reloadOverview } = props;
    const { id, inactive } = testHazard;
    const { sendRequest: softDeleteTestHazardAssessment } = useSoftDeleteTestHazardAssessment(id);
    const { t } = useTestHazardAssessmentMachineConfigTranslation();
    return (
        <ResourceOverview.PreviewActionButton
            onClick={async () => {
                await softDeleteTestHazardAssessment();
                reloadOverview();
            }}
            variant="ghost"
            icon={<Icon icon="exchange" />}
        >
            {inactive ? t("preview.setActive") : t("preview.setInactive")}
        </ResourceOverview.PreviewActionButton>
    );
};
