import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";

export type CancelUploadModalProps = {
    descriptionText: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export const CancelUploadModal = (props: CancelUploadModalProps) => {
    const { descriptionText, isOpen, onCancel, onConfirm } = props;
    const { t } = useLogbookTranslation();

    return (
        <Modal isOpen={isOpen} onClose={() => {}} variant="prompt">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("fileUpload.cancelUploadModal.title")}</ModalHeader>
                <ModalBody>{descriptionText}</ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={onCancel}>
                        {t("fileUpload.cancelUploadModal.cancelButtonLabel")}
                    </Button>
                    <Button variant="secondary" onClick={onConfirm}>
                        {t("fileUpload.cancelUploadModal.confirmButtonLabel")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
