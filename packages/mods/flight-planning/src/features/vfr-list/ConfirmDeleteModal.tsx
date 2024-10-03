import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../../translations";

export type ConfirmDeleteModalProps = {
    descriptionText: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export const ConfirmDeleteModal = (props: ConfirmDeleteModalProps) => {
    const { descriptionText, isOpen, onCancel, onConfirm } = props;
    const { t } = useFlightPlanningTranslation();

    return (
        <Modal isOpen={isOpen} onClose={() => {}} variant="prompt">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("vfrLayer.confirmDeleteModal.title")}</ModalHeader>
                <ModalBody>{descriptionText}</ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={onConfirm}>
                        {t("vfrLayer.confirmDeleteModal.confirmButtonLabel")}
                    </Button>
                    <Button variant="secondary" onClick={onCancel}>
                        {t("vfrLayer.confirmDeleteModal.cancelButtonLabel")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
