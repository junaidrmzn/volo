import {
    Divider,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { CrewMemberCalenderBlockingTime } from "@voloiq/crew-management-api/v1";
import { useCrewApiTranslation } from "../../../../translations/useCrewApiTranslation";
import { EditEventForm } from "./EditEventForm";

type EditEventModalProps = {
    isOpen: boolean;
    onClose: () => void;
    crewMemberId: string;
    event: CrewMemberCalenderBlockingTime;
    refetchCrewMembersCalendars: () => void;
};

export const EditEventModal = (props: EditEventModalProps) => {
    const { isOpen, onClose, crewMemberId, event, refetchCrewMembersCalendars } = props;
    const { t } = useCrewApiTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton size="lg" onClick={onClose} />
                <ModalHeader display="flex" alignItems="center">
                    {t("calendar.modal.edit")}&nbsp;<Heading>-&nbsp;{t("calendar.modal.event")}</Heading>
                </ModalHeader>
                <Divider />
                <ModalBody>
                    <EditEventForm
                        onClose={onClose}
                        crewMemberId={crewMemberId}
                        event={event}
                        refetchCrewMembersCalendars={refetchCrewMembersCalendars}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
