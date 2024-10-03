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
import { RouteOptionAssignment } from "./RouteOptionAssignment";

export type RouteOptionAssignmentModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    mission: Mission;
    onReloadList: () => void;
};

export const RouteOptionAssignmentModal = (props: RouteOptionAssignmentModalProps) => {
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
                            mission.assignments?.routeOptionId
                                ? t("missionActions.reAssignRouteOption")
                                : t("missionActions.assignRouteOption")
                        }
                        modalTitle={t("missionActions.missionLabel", { mission: mission.flightNumber })}
                    />
                </ModalHeader>
                <ModalBody>
                    <RouteOptionAssignment mission={mission} onReloadList={onReloadList} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
