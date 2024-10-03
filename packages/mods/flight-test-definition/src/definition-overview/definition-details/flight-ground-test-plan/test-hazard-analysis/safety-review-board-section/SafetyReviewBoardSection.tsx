import { Spinner, VStack, useDisclosure } from "@volocopter/design-library-react";
import type { RiskLevel } from "@voloiq/flight-test-definition-api/v1";
import { useGetAssignedTestHazardAssessmentsQuery } from "@voloiq/flight-test-definition-api/v1";
import { ModalTriggerButton } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { HighestRiskLevelBanner } from "./HighestRiskLevelBanner";
import { TestHazardAssessmentsTable } from "./TestHazardAssessmentsTable";
import { SafetyReviewBoardModal } from "./safety-review-board-section-modal/SafetyReviewBoardModal";
import { useSafetyReviewBoardSectionTranslation } from "./translations/useSafetyReviewBoardSectionTranslation";

type SafetyReviewBoardSectionProps = {
    definitionId: string;
    highestRiskLevel?: RiskLevel;
};

export const SafetyReviewBoardSection = (props: SafetyReviewBoardSectionProps) => {
    const { definitionId, highestRiskLevel } = props;

    const { t } = useSafetyReviewBoardSectionTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { testHazardAssessments, isLoading } = useGetAssignedTestHazardAssessmentsQuery({ definitionId });

    return (
        <VStack boxSize="full" spacing={4} alignItems="stretch">
            <SectionHeader label={t("Flight Test Safety Review Board")}>
                {isLoading ? (
                    <Spinner size="sm" />
                ) : (
                    <ModalTriggerButton
                        onClick={onOpen}
                        triggerType="iconButton"
                        operationType="edit"
                        resourceName={t("Test Hazard Assessments")}
                    />
                )}
            </SectionHeader>
            <HighestRiskLevelBanner highestRiskLevel={highestRiskLevel} />
            <TestHazardAssessmentsTable testHazardAssessments={testHazardAssessments} />
            <SafetyReviewBoardModal isOpen={isOpen} onClose={onClose} testHazardAssessments={testHazardAssessments} />
        </VStack>
    );
};
