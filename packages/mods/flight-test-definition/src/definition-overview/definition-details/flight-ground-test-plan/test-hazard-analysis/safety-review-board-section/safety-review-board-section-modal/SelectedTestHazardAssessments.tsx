import { Flex, Text, VStack } from "@volocopter/design-library-react";
import type { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { TestHazardAssessmentResultItem } from "./TestHazardAssessmentResultItem";
import { TestHazardAssessmentGroup } from "./groupTestHazardAssessments";
import { useSafetyReviewBoardSectionModalTranslation } from "./translations/useSafetyReviewBoardSectionModalTranslation";

export type SelectedTestHazardAssessmentsProps = {
    selectedItems: TestHazardAssessment[];
    groupedSelectedItems: TestHazardAssessmentGroup[];
    handleOnToggle: (checked: boolean, testHazardAssessment: TestHazardAssessment) => void;
};

export const SelectedTestHazardAssessments = (props: SelectedTestHazardAssessmentsProps) => {
    const { groupedSelectedItems, selectedItems, handleOnToggle } = props;

    const { t } = useSafetyReviewBoardSectionModalTranslation();

    return (
        <VStack w="full" h="full" spacing={2}>
            <Flex justify="flex-start" w="full">
                <Text fontWeight="bold" fontSize="xs">
                    {`${t("Selected")} (${selectedItems.length ?? 0})`}
                </Text>
            </Flex>

            <VStack
                w="full"
                spacing={4}
                pr={2}
                overflowY="scroll"
                maxH="55vh"
                role="list"
                aria-label={t("Selected Test Hazard Assessments")}
            >
                {groupedSelectedItems.map((group) =>
                    group.testHazardAssessments.length > 0 ? (
                        <VStack key={group.id} w="full" spacing={2}>
                            <Text alignSelf="flex-start">{t(`HazardGroupEnum.${group.id}`)}</Text>
                            {group.testHazardAssessments.map((testHazardAssessment) => (
                                <TestHazardAssessmentResultItem
                                    key={testHazardAssessment.id}
                                    testHazardAssessment={testHazardAssessment}
                                    onToggle={handleOnToggle}
                                    isChecked
                                />
                            ))}
                        </VStack>
                    ) : null
                )}
            </VStack>
        </VStack>
    );
};
