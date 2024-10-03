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
import { useCrewApiTranslation } from "../../../../translations/useCrewApiTranslation";
import { AddEventForm } from "./AddEventForm";

type AddEventModalProps = {
    isOpen: boolean;
    onClose: () => void;
    crewMemberId: string;
    refetchCrewMembersCalendars: () => void;
};

export const AddEventModal = (props: AddEventModalProps) => {
    const { isOpen, onClose, crewMemberId, refetchCrewMembersCalendars } = props;
    const { t } = useCrewApiTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton size="lg" onClick={onClose} />
                <ModalHeader display="flex" alignItems="center">
                    {t("calendar.modal.add")}&nbsp;<Heading>-&nbsp;{t("calendar.modal.event")}</Heading>
                </ModalHeader>
                <Divider />
                <ModalBody>
                    <AddEventForm
                        onClose={onClose}
                        crewMemberId={crewMemberId}
                        refetchCrewMembersCalendars={refetchCrewMembersCalendars}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
