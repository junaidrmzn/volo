import {
    Divider,
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
import { DivertMission } from "./DivertMission";

export type DivertMissionModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    mission: Mission;
    onReloadList: () => void;
};

export const DivertMissionModal = (props: DivertMissionModalProps) => {
    const { isOpen = false, onClose, mission, onReloadList } = props;

    const { t } = useMissionTranslations();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={`${t("divertMission.label")} -`} modalTitle={t("Mission")} />
                </ModalHeader>
                <Divider />
                <ModalBody>
                    <DivertMission mission={mission} onReloadList={onReloadList} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
