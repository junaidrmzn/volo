import { Box, HStack, Stack, Text } from "@volocopter/design-library-react";
import { TestPointAssociatedProcedure } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useAssociatedProceduresTranslation } from "./translations/useAssociatedProceduresTranslation";

export type AssociatedProceduresListItemTitleProps = {
    cardIndex: number;
    associatedProcedure: TestPointAssociatedProcedure;
};

const setCardIndex = (cardIndex: number) => {
    return cardIndex < 10 ? `0${cardIndex}` : `${cardIndex}`;
};

export const AssociatedProceduresListItemTitle = (props: AssociatedProceduresListItemTitleProps) => {
    const { cardIndex, associatedProcedure } = props;

    const { t } = useAssociatedProceduresTranslation();

    return (
        <HStack spacing={3} align="top" boxSize="full">
            <Box w="5%">
                <Text fontWeight="bold" align="left">
                    {setCardIndex(cardIndex)}
                </Text>
            </Box>
            <Box w="70%">
                <TextWithLabel align="left" label={t("Title")} text={associatedProcedure.title} />
            </Box>
            <Box w="25%">
                <Stack spacing="0">
                    <Text align="left" lineHeight={6} fontSize="xs" fontWeight="bold" color="fontOnBgMuted">
                        {t("Test Point ID")}
                    </Text>
                    {associatedProcedure.testPointIds &&
                        associatedProcedure.testPointIds.map((testPointId) => (
                            <Text
                                align="left"
                                key={`text_${testPointId}`}
                                lineHeight={6}
                                fontSize="md"
                                overflowWrap="anywhere"
                                whiteSpace="pre-wrap"
                            >
                                {testPointId}
                            </Text>
                        ))}
                </Stack>
            </Box>
        </HStack>
    );
};
