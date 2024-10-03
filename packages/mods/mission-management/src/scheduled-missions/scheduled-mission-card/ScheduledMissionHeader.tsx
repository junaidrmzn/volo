import { Flex, HStack, Text } from "@volocopter/design-library-react";
import { AircraftAssignment, ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";

type ScheduledMissionHeaderProps = {
    mission: ShortInfoMission;
    aircraftAssignment: AircraftAssignment;
    isXSCardVisible: boolean;
    isSCardVisible: boolean;
};

export const ScheduledMissionHeader = (props: ScheduledMissionHeaderProps) => {
    const { mission, aircraftAssignment, isXSCardVisible, isSCardVisible } = props;
    return (
        <Flex width="100%" gap={1} alignItems="center" justifyContent="space-between">
            <HStack>
                {isXSCardVisible && (
                    <Text fontSize="sm" lineHeight={6} fontWeight="bold">
                        {mission.flightNumber}
                    </Text>
                )}
                {isSCardVisible && (
                    <Text fontSize="sm" lineHeight={6}>
                        {aircraftAssignment.aircraftTypeName}
                    </Text>
                )}
            </HStack>
        </Flex>
    );
};
