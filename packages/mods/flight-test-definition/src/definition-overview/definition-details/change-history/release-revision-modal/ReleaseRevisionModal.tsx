import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { ReleaseRevisionForm } from "./ReleaseRevisionForm";

type ReleaseRevisionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    modalType: string;
    definitionId: string;
    refetchDefinition?: () => void;
    latestRevision?: string;
};

export const ReleaseRevisionModal = (props: ReleaseRevisionModalProps) => {
    const { onClose, isOpen, modalTitle, modalType, definitionId, refetchDefinition, latestRevision } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalTitle={modalTitle} modalType={modalType} />
                </ModalHeader>
                <ModalBody>
                    <ReleaseRevisionForm
                        onClose={onClose}
                        definitionId={definitionId}
                        refetchDefinition={refetchDefinition}
                        latestRevision={latestRevision}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
