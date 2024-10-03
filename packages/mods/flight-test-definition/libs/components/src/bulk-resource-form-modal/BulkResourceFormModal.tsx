import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import type { AnyObjectSchema } from "@voloiq/form";
import type { BulkResourceFormProps } from "../bulk-resource-form/BulkResourceForm";
import { BulkResourceForm } from "../bulk-resource-form/BulkResourceForm";

export type BulkResourceFormModalProps<Schema extends AnyObjectSchema> = {
    header: ReactNode;
    isOpen?: boolean;
    onModalClose: () => void;
} & BulkResourceFormProps<Schema>;

export const BulkResourceFormModal = <Schema extends AnyObjectSchema>(props: BulkResourceFormModalProps<Schema>) => {
    const { isOpen = true, header, onModalClose, onAfterSubmit, ...bulkFormProps } = props;

    const handleOnAfterSubmit = () => {
        onModalClose();
        onAfterSubmit?.();
    };

    return (
        <Modal isOpen={isOpen} onClose={onModalClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>{header}</ModalHeader>
                <ModalBody>
                    <BulkResourceForm {...bulkFormProps} onAfterSubmit={handleOnAfterSubmit} withSubmitButton />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
