import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import type { AnyObjectSchema } from "@voloiq/form";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { CreateResourceForm, CreateResourceFormProps } from "./CreateResourceForm";
import { useResourceSectionTranslation } from "./translations/useResourceSectionTranslation";

export type CreateResourceFormModalProps<Schema extends AnyObjectSchema> = {
    resourceNameSingular: string;
    isOpen?: boolean;
    onClose: () => void;
} & CreateResourceFormProps<Schema>;

export const CreateResourceFormModal = <Schema extends AnyObjectSchema>(
    props: CreateResourceFormModalProps<Schema>
) => {
    const { resourceNameSingular, isOpen = true, onClose, ...editResourceFormProps } = props;
    const { t } = useResourceSectionTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("Edit")} modalTitle={resourceNameSingular} />
                </ModalHeader>
                <ModalBody>
                    <CreateResourceForm {...editResourceFormProps} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
