import { VStack } from "@volocopter/design-library-react";
import type { RiskLevel, TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { ReadonlyResourceSectionContainer } from "@voloiq/flight-test-definition-components";
import { SafetyReviewCommentsSectionContent } from "../../../flight-ground-test-plan/test-hazard-analysis/additional-comments-section/SafetyReviewCommentsSectionContent";
import { HighestRiskLevelBanner } from "../../../flight-ground-test-plan/test-hazard-analysis/safety-review-board-section/HighestRiskLevelBanner";
import { TestHazardAssessmentsTable } from "../../../flight-ground-test-plan/test-hazard-analysis/safety-review-board-section/TestHazardAssessmentsTable";
import { useTestHazardAnalysisChangesReviewTranslation } from "./translations/useTestHazardAnalysisChangesReviewTranslation";

export type TestHazardAnalysisChangesReviewProps = {
    testHazardAssessments: TestHazardAssessment[];
    safetyReviewComments?: string;
    highestRiskLevel?: RiskLevel;
};

export const TestHazardAnalysisChangesReview = (props: TestHazardAnalysisChangesReviewProps) => {
    const { safetyReviewComments, testHazardAssessments, highestRiskLevel } = props;

    const { t } = useTestHazardAnalysisChangesReviewTranslation();
    return (
        <VStack w="full" h="full" bgColor="bgContentLayer" p={2} borderRadius="md">
            <ReadonlyResourceSectionContainer sectionTitle={t("Flight Test Safety Review Board")}>
                <HighestRiskLevelBanner highestRiskLevel={highestRiskLevel} />
                <TestHazardAssessmentsTable testHazardAssessments={testHazardAssessments} />
            </ReadonlyResourceSectionContainer>
            <ReadonlyResourceSectionContainer sectionTitle={t("Additional Comments")}>
                <SafetyReviewCommentsSectionContent additionalComments={safetyReviewComments} />
            </ReadonlyResourceSectionContainer>
        </VStack>
    );
};
