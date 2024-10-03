import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { useVertiportTranslation } from "../../../../../../../translations/useVertiportTranslation";
import { PadEventForm } from "../forms/PadEventForm";
import { useOnCreatePadEvent } from "./useOnCreatePadEvent";

type AddPadEventModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const AddPadEventModal = (props: AddPadEventModalProps) => {
    const { isOpen, onClose } = props;
    const { onCreate } = useOnCreatePadEvent({ onClose });
    const { t } = useVertiportTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("buttons.add")} modalTitle={t("fatoStandEvent.label")} />
                </ModalHeader>
                <ModalBody>
                    <PadEventForm formType="create" onCreate={onCreate} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
