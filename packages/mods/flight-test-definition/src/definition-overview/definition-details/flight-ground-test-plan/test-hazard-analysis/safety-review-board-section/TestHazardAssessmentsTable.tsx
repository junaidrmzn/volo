import { Box, HStack, VStack } from "@volocopter/design-library-react";
import { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { EmptyListMessage } from "@voloiq/flight-test-definition-components";
import { TestHazardAssessmentRow } from "./TestHazardAssessmentRow";
import { useSafetyReviewBoardSectionTranslation } from "./translations/useSafetyReviewBoardSectionTranslation";

export type TestHazardAssessmentsTableProps = {
    testHazardAssessments: TestHazardAssessment[];
};

export const TestHazardAssessmentsTable = (props: TestHazardAssessmentsTableProps) => {
    const { testHazardAssessments } = props;

    const { t } = useSafetyReviewBoardSectionTranslation();

    return (
        <VStack w="full" role="list" aria-label={t("Test Hazard Assessments")}>
            {testHazardAssessments.length > 0 ? (
                <VStack w="full">
                    <HStack
                        w="full"
                        pt={0.5}
                        pb={2}
                        px={3}
                        lineHeight={6}
                        fontSize="xs"
                        spacing={2}
                        borderBottom="2px"
                        borderColor="decorative1Muted"
                        align="center"
                    >
                        <Box fontSize="xs" fontWeight="semibold" lineHeight={6} flex={1}>
                            {t("Hazard")}
                        </Box>
                        <HStack flex={1} spacing={2}>
                            <Box fontSize="xs" fontWeight="semibold" lineHeight={6} textAlign="center" flex={1}>
                                {t("Risk Level (Pre-Mitigation)")}
                            </Box>
                            <Box fontSize="xs" fontWeight="semibold" lineHeight={6} textAlign="center" flex={1}>
                                {t("Risk Level (Residual)")}
                            </Box>
                        </HStack>
                    </HStack>
                    {testHazardAssessments.map((testHazardAssessment) => (
                        <TestHazardAssessmentRow
                            key={testHazardAssessment.id}
                            testHazardAssessment={testHazardAssessment}
                        />
                    ))}
                </VStack>
            ) : (
                <EmptyListMessage message={t("No test hazards. Please add the related information.")} />
            )}
        </VStack>
    );
};
