import { Flex, HStack, Text } from "@volocopter/design-library-react";

type ScheduledMissionHeaderProps = {
    flightNumber?: string;
    aircraftTypeName?: string;
};

export const ScheduledMissionHeader = (props: ScheduledMissionHeaderProps) => {
    const { flightNumber, aircraftTypeName } = props;
    return (
        <Flex width="100%" gap={1} alignItems="center" justifyContent="space-between">
            <HStack>
                <Text fontSize="sm" lineHeight={6} fontWeight="bold">
                    {flightNumber}
                </Text>
                <Text fontSize="sm" lineHeight={6}>
                    {aircraftTypeName}
                </Text>
            </HStack>
        </Flex>
    );
};
