import { Box, HStack, Text, VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { Requirement } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useRequirementsSectionTranslation } from "./translations/useRequirementsSectionTranslation";

export type ManualRequirementListItemProps = {
    manualRequirement: Requirement;
};

export const ManualRequirementListItem = (props: ManualRequirementListItemProps) => {
    const { manualRequirement } = props;
    const { description, title, passOrFailCriteria } = manualRequirement;
    const { t } = useRequirementsSectionTranslation();

    return (
        <VStack
            w="full"
            background="gray100Gray900"
            px={3}
            py={1.5}
            alignItems="flex-start"
            spacing={3}
            borderRadius="sm"
        >
            <HStack w="full" justifyContent="space-between">
                <Text fontWeight="bold">{title}</Text>
                <Box
                    borderRadius="sm"
                    px={1.5}
                    py={0}
                    fontSize="xs"
                    lineHeight={6}
                    fontWeight="bold"
                    bgColor="pink.100"
                >
                    {t("Manual")}
                </Box>
            </HStack>
            <HStack w="full" alignItems="flex-start">
                <Box flex={2}>
                    <TextWithLabel label={t("Description")} text={<EditorTextDisplay document={description} />} />
                </Box>
                <Box flex={3}>
                    <TextWithLabel
                        label={t("Pass / Fail Criteria")}
                        text={passOrFailCriteria && <EditorTextDisplay document={passOrFailCriteria} />}
                    />
                </Box>
            </HStack>
        </VStack>
    );
};
