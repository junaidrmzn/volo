import { Box, HStack, Text } from "@volocopter/design-library-react";
import type { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { useSafetyReviewBoardSectionTranslation } from "./translations/useSafetyReviewBoardSectionTranslation";
import { useRiskLevelColor } from "./useRiskLevelColor";

export type TestHazardAssessmentRowProps = {
    testHazardAssessment: TestHazardAssessment;
};

export const TestHazardAssessmentRow = (props: TestHazardAssessmentRowProps) => {
    const { testHazardAssessment } = props;
    const { hazard, preMitigationRiskLevel, residualRiskLevel } = testHazardAssessment;

    const { t } = useSafetyReviewBoardSectionTranslation();
    const { getRiskLevelDotColor } = useRiskLevelColor();

    return (
        <HStack
            w="full"
            pt={0.5}
            pb={2}
            px={3}
            spacing={2}
            borderBottom="2px"
            borderColor="decorative1Muted"
            align="center"
        >
            <Box flex={1}>
                <Text wordBreak="break-word" fontSize="xs" lineHeight={6}>
                    {hazard}
                </Text>
            </Box>
            <HStack flex={1} spacing={2} align="center">
                <HStack flex={1} justify="center" spacing={2}>
                    <Text as="span" color={getRiskLevelDotColor(preMitigationRiskLevel)} lineHeight={6}>
                        &#9679;
                    </Text>
                    <Text fontSize="xs" lineHeight={6}>
                        {t(`RiskLevel.${preMitigationRiskLevel}`)}
                    </Text>
                </HStack>
                <HStack flex={1} justify="center" spacing={2}>
                    <Text as="span" color={getRiskLevelDotColor(residualRiskLevel)} lineHeight={6}>
                        &#9679;
                    </Text>
                    <Text fontSize="xs" lineHeight={6}>
                        {t(`RiskLevel.${residualRiskLevel}`)}
                    </Text>
                </HStack>
            </HStack>
        </HStack>
    );
};
