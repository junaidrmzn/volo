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
import { MissionTestCrewAssignment } from "./MissionTestCrewAssignment";

export type TestCrewAssignmentModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    mission: Mission;
    onReloadList: () => void;
};

export const TestCrewAssignmentModal = (props: TestCrewAssignmentModalProps) => {
    const { isOpen = false, onClose, mission, onReloadList } = props;
    const { t } = useMissionTranslations();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={t("missionActions.assignCrew")}
                        modalTitle={t("missionActions.missionLabel", { mission: mission.flightNumber })}
                    />
                </ModalHeader>
                <ModalBody>
                    <MissionTestCrewAssignment mission={mission} onReloadList={onReloadList} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
