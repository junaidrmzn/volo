import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { DivertMissionModal } from "./divert-mission/DivertMissionModal";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type DivertMissionButtonProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const DivertMissionButton = (props: DivertMissionButtonProps) => {
    const { mission, onReloadList } = props;
    const { t } = useMissionTranslations();
    const {
        isOpen: isDivertMissionModalOpen,
        onClose: onCloseDivertMissionModal,
        onOpen: onOpenDivertMissionModal,
    } = useDisclosure();
    const { onClosePopover } = useActionsPopover();

    return (
        <>
            {mission.statusOfMission === StatusOfMission.FLYING && (
                <Button
                    leftIcon={<Icon icon="curvedArrowRight" />}
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                        onOpenDivertMissionModal();
                        onClosePopover();
                    }}
                >
                    {t("missionActions.divertMission")}
                </Button>
            )}
            <DivertMissionModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isDivertMissionModalOpen}
                onClose={onCloseDivertMissionModal}
            />
        </>
    );
};
