import { HStack, Tag, Text, VStack } from "@volocopter/design-library-react";
import { RiskLevel } from "@voloiq/flight-test-definition-api/v1";
import { useSafetyReviewBoardSectionTranslation } from "./translations/useSafetyReviewBoardSectionTranslation";
import { useRiskLevelColor } from "./useRiskLevelColor";

export type HighestRiskLevelBannerProps = {
    highestRiskLevel?: RiskLevel;
};

export const HighestRiskLevelBanner = (props: HighestRiskLevelBannerProps) => {
    const { highestRiskLevel } = props;

    const { getRiskLevelTagColor } = useRiskLevelColor();
    const { t } = useSafetyReviewBoardSectionTranslation();

    return (
        <VStack
            width="full"
            padding={3}
            backgroundColor="decorative1Muted"
            alignItems="flex-start"
            spacing={2}
            borderRadius="md"
        >
            <Text fontSize="xs" fontWeight="semibold" lineHeight={6}>
                {t("Test Hazard Analysis")}
            </Text>
            <HStack spacing={2}>
                <Text fontSize="xs">{t("Highest Risk Level")}:</Text>
                {highestRiskLevel ? (
                    <Tag ml={2} colorScheme={getRiskLevelTagColor(highestRiskLevel)}>
                        <Tag.Label
                            lineHeight={6}
                            fontSize="xs"
                            role="status"
                            aria-label={t("Highest Risk Level description")}
                        >
                            {t(`RiskLevel.${highestRiskLevel}`)}
                        </Tag.Label>
                    </Tag>
                ) : (
                    <Text lineHeight={6} fontSize="xs">
                        -
                    </Text>
                )}
            </HStack>
        </VStack>
    );
};
