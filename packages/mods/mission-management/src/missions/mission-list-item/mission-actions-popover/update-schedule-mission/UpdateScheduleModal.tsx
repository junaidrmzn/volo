import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { MissionDepartureArrival } from "./MissionDepartureArrival";

export type UpdateScheduleModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    mission: Mission;
    onReloadList: () => void;
    initialValues?: {
        estimatedDepartureDateTime?: Date;
        estimatedArrivalDateTime?: Date;
    };
};

export const UpdateScheduleModal = (props: UpdateScheduleModalProps) => {
    const { isOpen = false, onClose, mission, onReloadList, initialValues } = props;

    const { t } = useMissionTranslations();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton aria-label={t("buttons.close")} />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={t("missionActions.update")}
                        modalTitle={t("missionActions.schedule")}
                    />
                </ModalHeader>
                <ModalBody>
                    <MissionDepartureArrival
                        mission={mission}
                        onReloadList={onReloadList}
                        onClose={onClose}
                        initialValues={initialValues}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
