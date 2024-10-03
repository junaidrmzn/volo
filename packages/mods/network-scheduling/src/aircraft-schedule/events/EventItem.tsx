import { Text, VStack } from "@volocopter/design-library-react";
import { useScheduleColors } from "../useScheduleColors";

export type EventItemProps = {
    eventName: string;
    isBlockedForMission?: boolean;
};

export const EventItem = (props: EventItemProps) => {
    const { eventName, isBlockedForMission = false } = props;
    const { eventBackgroundStripeColor, eventBackgroundColor } = useScheduleColors();
    const backgroundImage = `repeating-linear-gradient(120deg, ${eventBackgroundStripeColor}, ${eventBackgroundStripeColor} 1rem, transparent 1rem, transparent 1.75rem)`;

    return (
        <VStack
            backgroundColor={eventBackgroundColor}
            borderRadius="sm"
            py={1}
            px={2}
            whiteSpace="nowrap"
            boxSize="full"
            color="darkBlue.900"
            alignItems="flex-start"
            backgroundImage={isBlockedForMission ? backgroundImage : undefined}
        >
            <Text fontSize="sm" fontWeight="medium">
                {eventName}
            </Text>
        </VStack>
    );
};
