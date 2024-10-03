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
import type { EditResourceFormProps } from "./EditResourceForm";
import { EditResourceForm } from "./EditResourceForm";
import { useResourceSectionTranslation } from "./translations/useResourceSectionTranslation";

export type EditResourceFormModalProps<Schema extends AnyObjectSchema> = {
    resourceNameSingular: string;
    isOpen?: boolean;
    onClose: () => void;
} & EditResourceFormProps<Schema>;

export const EditResourceFormModal = <Schema extends AnyObjectSchema>(props: EditResourceFormModalProps<Schema>) => {
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
                    <EditResourceForm {...editResourceFormProps} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
