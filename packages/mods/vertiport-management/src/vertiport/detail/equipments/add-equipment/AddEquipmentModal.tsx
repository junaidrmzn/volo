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
import { AddEquipmentForm } from "./AddEquipmentForm";

type AddEquipmentButtonProps = {
    vertiport: Vertiport;
    isOpen: boolean;
    onClose: () => void;
    refetchData: () => void;
};

export const AddEquipmentModal = (props: AddEquipmentButtonProps) => {
    const { vertiport, isOpen, onClose, refetchData } = props;
    const { t } = useVertiportTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("buttons.add")} modalTitle={t("equipment.label")} />
                </ModalHeader>
                <ModalBody>
                    <AddEquipmentForm
                        onSuccessfulCreate={() => {
                            refetchData();
                            onClose();
                        }}
                        vertiport={vertiport}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
