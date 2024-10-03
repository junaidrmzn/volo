import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { PadState } from "../popover-context/ActionsPopoverContext";
import { MissionPadAssignment } from "./MissionPadAssignment";

export type MissionFatoAssignmentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    mission: Mission;
    onReloadList: () => void;
    actionsPadState: PadState;
};

export const MissionPadAssignmentModal = (props: MissionFatoAssignmentModalProps) => {
    const { mission, onClose, isOpen, onReloadList, actionsPadState } = props;
    const { t } = useMissionTranslations();

    const modalHeader = () => {
        return match(actionsPadState)
            .with("arrivalFato", () =>
                mission.assignments?.scheduledArrivalFatoId
                    ? t("missionActions.reassignArrivalFato")
                    : t("missionActions.assignArrivalFato")
            )
            .with("arrivalStand", () =>
                mission.assignments?.scheduledArrivalStandId
                    ? t("missionActions.reassignArrivalStand")
                    : t("missionActions.assignArrivalStand")
            )
            .with("departureFato", () =>
                mission.assignments?.scheduledDepartureFatoId
                    ? t("missionActions.reassignDepartureFato")
                    : t("missionActions.assignDepartureFato")
            )
            .with("departureStand", () =>
                mission.assignments?.scheduledDepartureStandId
                    ? t("missionActions.reassignDepartureStand")
                    : t("missionActions.assignDepartureStand")
            )
            .exhaustive();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={modalHeader()}
                        modalTitle={t("missionActions.missionLabel", { mission: mission.flightNumber })}
                    />
                </ModalHeader>
                <ModalBody>
                    <MissionPadAssignment
                        mission={mission}
                        onReloadList={onReloadList}
                        onClose={onClose}
                        actionsPadState={actionsPadState}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
