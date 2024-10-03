import { Checkbox, Flex, HStack, Text, VStack } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useWindchillRequirementsModalTranslation } from "./translations/useWindchillRequirementsModalTranslation";

export type WindchillSelectableRequirementListItemProps = {
    requirement: WindchillRequirement;
    onCheckboxChange: (checked: boolean, requirement: WindchillRequirement) => void;
    isChecked?: boolean;
    isSearchResult?: boolean;
    children?: ReactNode;
};

export const WindchillSelectableRequirementListItem = (props: WindchillSelectableRequirementListItemProps) => {
    const { requirement, onCheckboxChange, isChecked, isSearchResult, children } = props;
    const { documentId, windchillId, text } = requirement;
    const { t } = useWindchillRequirementsModalTranslation();

    return (
        <HStack
            bgColor="gray300Gray800"
            w="full"
            borderRadius={4}
            px={3}
            py={1}
            justify="space-between"
            role="group"
            aria-label={t(`${isSearchResult ? "" : "Assigned "}Windchill Requirement {documentId}-{windchillId}`, {
                documentId,
                windchillId,
            })}
        >
            <Checkbox
                size="sm"
                onChange={(event) => onCheckboxChange(event.target.checked, requirement)}
                isChecked={isChecked}
                mr={1}
            />

            <VStack flex={1} justify="space-around" alignItems="flex-start">
                <Flex justify="flex-start" w="full">
                    <Text fontWeight="bold" fontSize="small">
                        #{documentId} ➝ #{windchillId}
                    </Text>
                </Flex>

                <TextWithLabel label={t("Description")} size="small" text={text} />
                {children}
            </VStack>
        </HStack>
    );
};
