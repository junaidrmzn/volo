import { Box, Flex, HStack, VStack } from "@volocopter/design-library-react";
import { TestPointAssociatedProcedure } from "@voloiq/flight-test-definition-api/v1";
import { DetailsButton } from "@voloiq/flight-test-definition-components";
import { AssociatedProceduresListItemTitle } from "./AssociatedProceduresListItemTitle";
import { useAssociatedProceduresTranslation } from "./translations/useAssociatedProceduresTranslation";
import { useAssociatedProceduresButton } from "./useAssociatedProceduresButton";

export type AssociatedProceduresListItemProps = {
    cardIndex: number;
    associatedProcedure: TestPointAssociatedProcedure;
};

export const AssociatedProceduresListItem = (props: AssociatedProceduresListItemProps) => {
    const { cardIndex, associatedProcedure } = props;
    const { t } = useAssociatedProceduresTranslation();
    const { ftdId, id: procedureId } = associatedProcedure;
    const { handleProcedureDetailClick } = useAssociatedProceduresButton();

    return (
        <VStack
            background="decorative1Muted"
            key={cardIndex}
            alignItems="stretch"
            px={4}
            py={2}
            borderRadius="sm"
            spacing={0}
        >
            <HStack spacing={0}>
                <HStack
                    flex={1}
                    spacing={2}
                    as="button"
                    alignItems="flex-start"
                    aria-label={t("Associated Procedures Card")}
                >
                    <Box flex={1}>
                        <AssociatedProceduresListItemTitle
                            associatedProcedure={associatedProcedure}
                            cardIndex={cardIndex}
                        />
                    </Box>
                </HStack>
                <Flex width={10} px={3} height="full" alignItems="center">
                    <DetailsButton onClick={() => handleProcedureDetailClick(ftdId, procedureId)} />
                </Flex>
            </HStack>
        </VStack>
    );
};
