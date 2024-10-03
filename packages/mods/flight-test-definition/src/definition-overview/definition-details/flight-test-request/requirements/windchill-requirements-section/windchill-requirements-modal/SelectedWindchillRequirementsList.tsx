import { Flex, Text, VStack } from "@volocopter/design-library-react";
import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { WindchillSelectedRequirementListItem } from "./WindchillSelectedRequirementListItem";
import { useWindchillRequirementsModalTranslation } from "./translations/useWindchillRequirementsModalTranslation";

type SelectedWindchillRequirementsListProps = {
    handleCheckboxOnChange: (checked: boolean, requirement: WindchillRequirement) => void;
    selectedWindchillRequirements: WindchillRequirement[];
    editRequirement: (
        requirementId: WindchillRequirement["id"],
        passOrFailCriteria: WindchillRequirement["passOrFailCriteria"]
    ) => void;
    getPassOrFailCriteria: (requirementId: string) => string | undefined;
};

export const SelectedWindchillRequirementsList = (props: SelectedWindchillRequirementsListProps) => {
    const { handleCheckboxOnChange, selectedWindchillRequirements, editRequirement, getPassOrFailCriteria } = props;
    const { t } = useWindchillRequirementsModalTranslation();

    return (
        <VStack flex={1}>
            <Flex justify="flex-start" w="full">
                <Text fontWeight="bold" fontSize="sm">
                    {`${t("Selected")} (${selectedWindchillRequirements.length ?? 0})`}
                </Text>
            </Flex>

            <VStack w="full" pr={2}>
                {selectedWindchillRequirements.map((requirement) => (
                    <WindchillSelectedRequirementListItem
                        key={requirement.id}
                        requirement={requirement}
                        onCheckboxChange={handleCheckboxOnChange}
                        onChangePassOrFailCriteria={editRequirement}
                        getPassOrFailCriteria={getPassOrFailCriteria}
                        isChecked
                    />
                ))}
            </VStack>
        </VStack>
    );
};
