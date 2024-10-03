import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import type { ModalHeaderLayoutProps } from "@voloiq/text-layouts";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import type { UpdateStatusFormProps } from "./UpdateStatusForm";
import { UpdateStatusForm } from "./UpdateStatusForm";
import { useUpdateStatusModalTranslation } from "./translations/useUpdateStatusModalTranslation";

export type UpdateModalProps = {
    isOpen?: boolean;
    onClose: () => void;
} & Pick<UpdateStatusFormProps, "status" | "updateStatus"> &
    Pick<ModalHeaderLayoutProps, "modalTitle">;

export const UpdateStatusModal = (props: UpdateModalProps) => {
    const { status, updateStatus, isOpen = false, onClose, modalTitle } = props;

    const { t } = useUpdateStatusModalTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalTitle={modalTitle} modalType={t("Change Status")} />
                </ModalHeader>
                <ModalBody>
                    <UpdateStatusForm status={status} updateStatus={updateStatus} onAfterStatusUpdate={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
