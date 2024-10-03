import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { formatUTCDate } from "@voloiq/utils";
import { useLogAddTranslation } from "../../translations/useLogAddTranslation";

export type DateTimeReminderModalProps = {
    isOpen: boolean;
    selectedDateTime: Date;
    onClose: () => void;
    setReminderHasBeenConfirmed: (hasBeenConfirmed: boolean) => void;
};

export const DateTimeReminderModal = (props: DateTimeReminderModalProps) => {
    const { onClose, setReminderHasBeenConfirmed, selectedDateTime } = props;
    const { t } = useLogAddTranslation();

    return (
        <Modal size="sm" {...props}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("enterMetadataStep.dateTimeReminderModal.headline")}</ModalHeader>
                <ModalBody>
                    {t("enterMetadataStep.dateTimeReminderModal.description", {
                        timeOfFlight: formatUTCDate(selectedDateTime),
                    })}
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setReminderHasBeenConfirmed(true);
                            onClose();
                        }}
                    >
                        {t("enterMetadataStep.dateTimeReminderModal.confirmButton")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
