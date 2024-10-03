import { VStack } from "@volocopter/design-library-react";
import { useGetDefinitionQuery } from "@voloiq/flight-test-definition-api/v2";
import { useDefinition } from "../../definition-context/useDefinition";
import { SafetyReviewCommentsSection } from "./additional-comments-section/SafetyReviewCommentsSection";
import { SafetyReviewBoardSection } from "./safety-review-board-section/SafetyReviewBoardSection";

export const TestHazardAnalysis = () => {
    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { definition } = useGetDefinitionQuery({ definitionId });

    return (
        <VStack>
            <SafetyReviewBoardSection definitionId={definitionId} highestRiskLevel={definition?.highestRiskLevel} />
            <SafetyReviewCommentsSection
                definitionId={definitionId}
                safetyReviewComments={definition?.safetyReviewComments}
            />
        </VStack>
    );
};
