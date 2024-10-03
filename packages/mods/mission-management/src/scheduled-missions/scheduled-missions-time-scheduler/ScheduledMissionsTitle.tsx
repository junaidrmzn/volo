import { Tag, Text, VStack } from "@volocopter/design-library-react";
import { AircraftAssignment } from "@voloiq/network-schedule-management-api/v1";

type ScheduledMissionsTitleProps = {
    aircraftAssignment: AircraftAssignment;
};

export const ScheduledMissionsTitle = (props: ScheduledMissionsTitleProps) => {
    const { aircraftAssignment } = props;

    return (
        <VStack m={3} p={1} gap={2.5} height="100%">
            <Text fontSize="sm" lineHeight="base" fontWeight="bold">
                {aircraftAssignment.aircraftTypeName}
            </Text>
            <Tag colorScheme="gray">
                <Tag.Label variant="light">{aircraftAssignment.aircraftTechnicalStatus}</Tag.Label>
            </Tag>
        </VStack>
    );
};
