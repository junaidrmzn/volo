import { Box, HStack, Text, VStack } from "@volocopter/design-library-react";
import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useWindchillRequirementsSectionTranslation } from "./translations/useWindchillRequirementsSectionTranslation";

export type WindchillRequirementListItemProps = {
    windchillRequirement: WindchillRequirement;
};

export const WindchillRequirementListItem = (props: WindchillRequirementListItemProps) => {
    const { windchillRequirement } = props;
    const { windchillId, documentId, text, passOrFailCriteria } = windchillRequirement;
    const { t } = useWindchillRequirementsSectionTranslation();

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
                <Text fontWeight="bold">
                    #{documentId} ➝ #{windchillId}
                </Text>
                <Box
                    borderRadius="sm"
                    px={1.5}
                    py={0}
                    fontSize="xs"
                    lineHeight={6}
                    fontWeight="bold"
                    bgColor="teal.100"
                >
                    {t("Windchill")}
                </Box>
            </HStack>
            <HStack w="full">
                <Box flex={1}>
                    <TextWithLabel label={t("Description")} text={text} />
                </Box>
                <Box flex={1}>
                    <TextWithLabel label={t("Pass / Fail Criteria")} text={passOrFailCriteria} />
                </Box>
            </HStack>
        </VStack>
    );
};
