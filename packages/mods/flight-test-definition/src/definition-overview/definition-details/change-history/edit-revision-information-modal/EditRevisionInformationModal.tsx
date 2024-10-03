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
import { EditRevisionInformationForm } from "./EditRevisionInformationForm";

type ReleaseRevisionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    modalType: string;
    definitionId: string;
};

export const EditRevisionInformationModal = (props: ReleaseRevisionModalProps) => {
    const { isOpen, onClose, modalTitle, modalType, definitionId } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalTitle={modalTitle} modalType={modalType} />
                </ModalHeader>
                <ModalBody>
                    <EditRevisionInformationForm definitionId={definitionId} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
