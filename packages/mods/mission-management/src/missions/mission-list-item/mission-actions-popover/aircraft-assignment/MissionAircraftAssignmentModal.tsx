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
import { MissionAircraftAssignment } from "./MissionAircraftAssignment";

export type MissionAircraftAssignmentModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    mission: Mission;
    onReloadList: () => void;
};

export const MissionAircraftAssignmentModal = (props: MissionAircraftAssignmentModalProps) => {
    const { isOpen = false, onClose, mission, onReloadList } = props;

    const { t } = useMissionTranslations();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={
                            mission.assignments?.aircraftId
                                ? t("missionActions.reassignAircraft")
                                : t("missionActions.assignAircraft")
                        }
                        modalTitle={t("missionActions.missionLabel", { mission: mission.flightNumber })}
                    />
                </ModalHeader>
                <ModalBody>
                    <MissionAircraftAssignment mission={mission} onReloadList={onReloadList} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
