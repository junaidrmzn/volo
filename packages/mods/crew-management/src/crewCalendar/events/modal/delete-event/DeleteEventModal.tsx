import {
    Button,
    Divider,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@volocopter/design-library-react";
import { useDeleteCrewMemberBlockingTime } from "@voloiq/crew-management-api/v1";
import { useCrewApiTranslation } from "../../../../translations/useCrewApiTranslation";

type DeleteEventModalProps = {
    isOpen: boolean;
    onClose: () => void;
    crewMemberId: string;
    blockingTimeId: string;
    refetchCrewMembersCalendars: () => void;
};

export const DeleteEventModal = (props: DeleteEventModalProps) => {
    const { isOpen, onClose, crewMemberId, blockingTimeId, refetchCrewMembersCalendars } = props;
    const { t } = useCrewApiTranslation();
    const { sendRequestDeleteCrewMemberBlockingTime, isLoadingDeleteCrewMemberBlockingTime } =
        useDeleteCrewMemberBlockingTime({ crewMemberId, blockingTimeId });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton size="lg" onClick={onClose} />
                <ModalHeader display="flex" alignItems="center">
                    {t("calendar.modal.delete")}&nbsp;<Heading>-&nbsp;{t("calendar.modal.event")}</Heading>
                </ModalHeader>
                <Divider />
                <ModalBody>
                    <Text>{t("calendar.modal.deleteConfirmation")}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} variant="secondary">
                        {t("calendar.modal.cancel")}
                    </Button>
                    <Button
                        variant="primary"
                        isDisabled={isLoadingDeleteCrewMemberBlockingTime}
                        isLoading={isLoadingDeleteCrewMemberBlockingTime}
                        onClick={() =>
                            sendRequestDeleteCrewMemberBlockingTime().then(() => {
                                refetchCrewMembersCalendars();
                                onClose();
                            })
                        }
                    >
                        {t("calendar.modal.confirm")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
