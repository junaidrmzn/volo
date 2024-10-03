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
import { Equipment, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../../../translations/useVertiportTranslation";
import { EditEquipmentForm } from "./EditEquipmentForm";

type EditEquipmentModalProps = {
    equipment: Equipment;
    vertiport: Vertiport;
    isOpen: boolean;
    onClose: () => void;
    refetchData: () => void;
};

export const EditEquipmentModal = (props: EditEquipmentModalProps) => {
    const { equipment, vertiport, isOpen, onClose, refetchData } = props;
    const { t } = useVertiportTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("buttons.edit")} modalTitle={t("equipment.label")} />
                </ModalHeader>
                <ModalBody>
                    <EditEquipmentForm
                        equipment={equipment}
                        vertiport={vertiport}
                        onClose={onClose}
                        refetchData={refetchData}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
