import React from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { CardListItemProps } from "@voloiq/card-list-item";
import { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { ResourceOverview, ResourcePreviewOptions } from "@voloiq/resource-overview";
import { TestHazardAssessmentSoftDeleteButton } from "./TestHazardAssessmentStatusUpdateButton";
import { BulkCreateTestHazardAssessment } from "./add/BulkCreateTestHazardAssessment";
import { EditTestHazardAssessment } from "./edit/EditTestHazardAssessment";
import { TestHazardAssessmentListItem } from "./list/TestHazardAssessmentListItem";
import { TestHazardAssessmentPreview } from "./preview/TestHazardAssessmentPreview";
import { useTestHazardAssessmentMachineConfig } from "./test-hazard-assessment-machine-config/useTestHazardAssessmentMachineConfig";

export const TestHazardAssessmentOverview = () => {
    const { testHazardMachineConfig } = useTestHazardAssessmentMachineConfig();
    const canDelete = useIsAuthorizedTo(["delete"], ["TestHazard"]);

    return (
        <ResourceOverview<TestHazardAssessment> machineConfig={testHazardMachineConfig}>
            <ResourceOverview.ListItem>
                {(testHazard: TestHazardAssessment, cardListItemProps: CardListItemProps) => (
                    <TestHazardAssessmentListItem testHazards={testHazard} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(testHazard: TestHazardAssessment) => <TestHazardAssessmentPreview testHazard={testHazard} />}
            </ResourceOverview.Preview>
            <ResourceOverview.Add>{BulkCreateTestHazardAssessment}</ResourceOverview.Add>
            <ResourceOverview.Edit>{EditTestHazardAssessment}</ResourceOverview.Edit>
            <ResourceOverview.PreviewActionButtons>
                {(testHazard: TestHazardAssessment, options: ResourcePreviewOptions) => {
                    return (
                        testHazard.linkedDefinitions.length === 0 &&
                        canDelete && (
                            <TestHazardAssessmentSoftDeleteButton
                                reloadOverview={() => {
                                    options.reloadList();
                                    options.reloadPreview();
                                }}
                                testHazard={testHazard}
                            />
                        )
                    );
                }}
            </ResourceOverview.PreviewActionButtons>
        </ResourceOverview>
    );
};
