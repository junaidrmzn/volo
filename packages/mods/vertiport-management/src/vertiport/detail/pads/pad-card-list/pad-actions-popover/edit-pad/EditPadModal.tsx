import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import React from "react";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { Pad, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../../../translations/useVertiportTranslation";
import { EditPadForm } from "./EditPadForm";

type EditPadModalProps = {
    pad: Pad;
    vertiport: Vertiport;
    isOpen: boolean;
    onClose: () => void;
};

export const EditPadModal = (props: EditPadModalProps) => {
    const { pad, vertiport, isOpen, onClose } = props;
    const { t } = useVertiportTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("buttons.edit")} modalTitle={t("fatoStand.label")} />
                </ModalHeader>
                <ModalBody>
                    <EditPadForm pad={pad} vertiport={vertiport} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
