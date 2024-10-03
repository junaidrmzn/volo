import { Flex, HStack, Text, VStack } from "@volocopter/design-library-react";
import { AircraftAssignment, ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";

export type PopoverHeaderProps = {
    mission: ShortInfoMission;
    aircraftAssignment: AircraftAssignment;
};
export const PopoverHeader = (props: PopoverHeaderProps) => {
    const { mission, aircraftAssignment } = props;
    return (
        <VStack width="100%">
            <Flex width="100%" gap={1} alignItems="center" justifyContent="space-between">
                <HStack>
                    <Text fontSize="sm" lineHeight={6} fontWeight="bold">
                        {mission.flightNumber}
                    </Text>
                    <Text fontSize="sm" lineHeight={6}>
                        {aircraftAssignment.aircraftTypeName}
                    </Text>
                </HStack>
            </Flex>
        </VStack>
    );
};
