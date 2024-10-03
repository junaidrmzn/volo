import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { Aircraft, ParameterStatusEnum } from "@voloiq-typescript-api/fti-types/dist";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { AircraftStatusSelect } from "../../../libs/parameter-status/AircraftStatusSelect";
import { useAircraftSectionTranslation } from "./translations/useAircraftSectionTranslation";
import { useAircraftSectionStatusUpdate } from "./useAircraftSectionStatusUpdate";

export type AircraftSectionModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    aircraft: Aircraft;
    parameterId: string;
    parameterStatus: ParameterStatusEnum;
    onStatusChange: () => void;
};

export const AircraftSectionModal = (props: AircraftSectionModalProps) => {
    const { isOpen = true, parameterId, parameterStatus, aircraft, onClose, onStatusChange } = props;

    const { onParameterStatusUpdate } = useAircraftSectionStatusUpdate({
        onStatusChange,
        aircraftId: aircraft.id,
        parameterId,
        onClose,
    });
    const { t } = useAircraftSectionTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("modalType")} modalTitle={t("modalTitle")} />
                </ModalHeader>
                <ModalBody>
                    <AircraftStatusSelect
                        initialStatus={parameterStatus}
                        aircraft={aircraft}
                        onSubmit={onParameterStatusUpdate}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
