import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";
import { AddPadForm } from "./AddPadForm";

type AddPadButtonProps = {
    vertiport: Vertiport;
    isOpen: boolean;
    onClose: () => void;
};

export const AddPadModal = (props: AddPadButtonProps) => {
    const { vertiport, isOpen, onClose } = props;
    const { t } = useVertiportTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("buttons.add")} modalTitle={t("fatoStand.label")} />
                </ModalHeader>
                <ModalBody>
                    <AddPadForm onSuccessfulCreate={onClose} vertiport={vertiport} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
