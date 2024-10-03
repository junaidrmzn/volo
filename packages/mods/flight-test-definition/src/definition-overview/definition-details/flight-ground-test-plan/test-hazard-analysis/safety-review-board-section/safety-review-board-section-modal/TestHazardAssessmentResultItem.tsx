import { Checkbox, HStack, Text } from "@volocopter/design-library-react";
import { ChangeEvent } from "react";
import { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useSafetyReviewBoardSectionModalTranslation } from "./translations/useSafetyReviewBoardSectionModalTranslation";

export type TestHazardAssessmentResultItemProps = {
    onToggle: (isChecked: boolean, testHazardAssessment: TestHazardAssessment) => void;
    testHazardAssessment: TestHazardAssessment;
    isChecked: boolean;
};

export const TestHazardAssessmentResultItem = (props: TestHazardAssessmentResultItemProps) => {
    const { isChecked, onToggle, testHazardAssessment } = props;
    const { hazard, applicability } = testHazardAssessment;

    const { t } = useSafetyReviewBoardSectionModalTranslation();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        onToggle(event.target.checked, testHazardAssessment);
    };

    return (
        <HStack
            px={4}
            py={2}
            justify="space-between"
            align="center"
            w="full"
            backgroundColor="decorative1Basic"
            borderRadius="md"
            role="listitem"
            aria-label={hazard}
        >
            <HStack spacing={6}>
                <Checkbox
                    aria-label={isChecked ? t('Unselect "{hazard}"', { hazard }) : t('Select "{hazard}"', { hazard })}
                    onChange={handleOnChange}
                    size="sm"
                    isChecked={isChecked}
                />
                <Text fontSize="xs" fontWeight="semibold">
                    {hazard}
                </Text>
            </HStack>

            <TextWithLabel label={t("Applicability")} text={t(`ApplicabilityEnum.${applicability}`)} size="xs" />
        </HStack>
    );
};
