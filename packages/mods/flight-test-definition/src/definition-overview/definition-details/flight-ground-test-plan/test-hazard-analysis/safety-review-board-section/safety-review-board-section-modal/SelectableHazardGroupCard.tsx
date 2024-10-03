import { HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { ExpandableSelectableCard } from "@voloiq/flight-test-definition-components";
import { TestHazardAssessmentResultItem } from "./TestHazardAssessmentResultItem";
import { useSafetyReviewBoardSectionModalTranslation } from "./translations/useSafetyReviewBoardSectionModalTranslation";

export type SelectableHazardGroupCardProps = {
    hazardGroup: string;
    testHazardAssessments: TestHazardAssessment[];
    getIsItemSelected: (itemId: string) => boolean;
    onToggleItem: (isChecked: boolean, item: TestHazardAssessment) => void;
};

export const SelectableHazardGroupCard = (props: SelectableHazardGroupCardProps) => {
    const { hazardGroup, testHazardAssessments, getIsItemSelected, onToggleItem } = props;

    const { t } = useSafetyReviewBoardSectionModalTranslation();

    const selectState = match(testHazardAssessments)
        .when(
            (items) => items.every((item) => getIsItemSelected(item.id)),
            () => "selected" as const
        )
        .when(
            (items) => items.every((item) => !getIsItemSelected(item.id)),
            () => "unselected" as const
        )
        .otherwise(() => "indeterminate" as const);

    return (
        <ExpandableSelectableCard
            isSelectable
            cardLabel={hazardGroup}
            checkboxLabel={
                selectState === "selected"
                    ? t("Unselect all {hazardGroup} Test Hazards", { hazardGroup })
                    : t("Select all {hazardGroup} Test Hazards", { hazardGroup })
            }
            selectState={selectState}
            onChange={(isSelected) => {
                for (const testHazardAssessment of testHazardAssessments) {
                    onToggleItem(isSelected, testHazardAssessment);
                }
            }}
            defaultIsOpen
        >
            <ExpandableSelectableCard.Title>
                <HStack>
                    <Text fontSize="sm" lineHeight={6}>
                        {hazardGroup}
                    </Text>
                    <Spacer />
                    <Text fontSize="sm" lineHeight={6}>
                        {testHazardAssessments.length === 1
                            ? t("1 Test Hazard")
                            : t("{numberOfTestHazardAssessments} Test Hazards", {
                                  numberOfTestHazardAssessments: testHazardAssessments.length,
                              })}{" "}
                        -{" "}
                        {t("{numberOfTestHazardAssessments} selected", {
                            numberOfTestHazardAssessments: testHazardAssessments.filter((testHazardAssessments) =>
                                getIsItemSelected(testHazardAssessments.id)
                            ).length,
                        })}
                    </Text>
                </HStack>
            </ExpandableSelectableCard.Title>
            <ExpandableSelectableCard.Content>
                <VStack spacing={1} alignItems="stretch">
                    {testHazardAssessments.map((testHazardAssessment) => (
                        <TestHazardAssessmentResultItem
                            key={testHazardAssessment.id}
                            testHazardAssessment={testHazardAssessment}
                            isChecked={getIsItemSelected(testHazardAssessment.id)}
                            onToggle={onToggleItem}
                        />
                    ))}
                </VStack>
            </ExpandableSelectableCard.Content>
        </ExpandableSelectableCard>
    );
};
