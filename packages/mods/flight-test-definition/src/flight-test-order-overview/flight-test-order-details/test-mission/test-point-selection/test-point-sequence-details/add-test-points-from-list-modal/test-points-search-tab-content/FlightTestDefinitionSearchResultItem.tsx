import { HStack, Text, VStack } from "@volocopter/design-library-react";
import { DetailsButton } from "@voloiq/flight-test-definition-components";

export type FlightTestDefinitionSearchResultItemProps = {
    title: string;
    ftdId: string;
    isSelected: boolean;
    onDetailsButtonClick: () => void;
};

export const FlightTestDefinitionSearchResultItem = (props: FlightTestDefinitionSearchResultItemProps) => {
    const { isSelected, title, ftdId, onDetailsButtonClick } = props;

    return (
        <HStack
            px={3}
            py={1}
            spacing={3}
            justifyContent="space-between"
            alignItems="center"
            bgColor="decorative1Muted"
            borderRadius={4}
            borderWidth={1}
            w="full"
            borderColor={isSelected ? "borderOnBgActive" : undefined}
        >
            <VStack alignItems="flex-start" spacing={0}>
                <Text fontWeight="bold" fontSize="xs" lineHeight={2}>
                    {title}
                </Text>
                <Text fontSize="xs" lineHeight={1}>
                    {ftdId}
                </Text>
            </VStack>
            <DetailsButton onClick={onDetailsButtonClick} />
        </HStack>
    );
};
