import { HStack, Text, useDisclosure } from "@volocopter/design-library-react";
import { CrewMemberCalenderBlockingTime } from "@voloiq/crew-management-api/v1";
import { useScheduleColors } from "../useScheduleColors";
import { EventActionButtons } from "./EventActionButtons";
import { DeleteEventModal } from "./modal/delete-event";
import { EditEventModal } from "./modal/edit-event";

export type EventItemProps = {
    crewMemberId: string;
    event: CrewMemberCalenderBlockingTime;
    refetchCrewMembersCalendars: () => void;
};

export const EventItem = (props: EventItemProps) => {
    const { crewMemberId, event, refetchCrewMembersCalendars } = props;
    const { eventBackgroundStripeColor, eventBackgroundColor } = useScheduleColors();
    const backgroundImage = `repeating-linear-gradient(120deg, ${eventBackgroundStripeColor}, ${eventBackgroundStripeColor} 1rem, transparent 1rem, transparent 1.75rem)`;
    const { onOpen: onOpenEditModal, onClose: onCloseEditModal, isOpen: isOpenEditModal } = useDisclosure();
    const { onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal, isOpen: isOpenDeleteModal } = useDisclosure();

    return (
        <HStack
            backgroundColor={eventBackgroundColor}
            borderRadius="sm"
            py={1}
            px={2}
            whiteSpace="nowrap"
            boxSize="full"
            color="darkBlue.900"
            alignItems="flex-start"
            justifyContent="space-between"
            backgroundImage={event.mission !== undefined ? backgroundImage : undefined}
        >
            <Text fontSize="sm" fontWeight="medium">
                {event.title}
            </Text>
            <EventActionButtons onOpenEditModal={onOpenEditModal} onOpenDeleteModal={onOpenDeleteModal} />
            <EditEventModal
                isOpen={isOpenEditModal}
                onClose={onCloseEditModal}
                crewMemberId={crewMemberId}
                event={event}
                refetchCrewMembersCalendars={refetchCrewMembersCalendars}
            />
            <DeleteEventModal
                isOpen={isOpenDeleteModal}
                onClose={onCloseDeleteModal}
                crewMemberId={crewMemberId}
                blockingTimeId={event?.id}
                refetchCrewMembersCalendars={refetchCrewMembersCalendars}
            />
        </HStack>
    );
};
