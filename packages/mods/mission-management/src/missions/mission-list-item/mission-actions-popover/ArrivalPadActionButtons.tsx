import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { MissionPadAssignmentModal } from "./pad-assignment/MissionPadAssignmentModal";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type ArrivalPadActionButtonsProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const ArrivalPadActionButtons = (props: ArrivalPadActionButtonsProps) => {
    const { mission, onReloadList } = props;
    const {
        isOpen: isPadAssignmentModalOpen,
        onClose: onClosePadAssignmentModal,
        onOpen: onOpenPadAssignmentModal,
    } = useDisclosure();

    const { setActionsPadState, actionsPadState } = useActionsPopover();

    const { onClosePopover } = useActionsPopover();
    const { t } = useMissionTranslations();

    return (
        <>
            <Button
                leftIcon={<Icon icon="infoLight" />}
                variant="ghost"
                size="lg"
                onClick={() => {
                    setActionsPadState("arrivalFato");
                    onOpenPadAssignmentModal();
                    onClosePopover();
                }}
            >
                {mission.scheduledArrivalFatoId
                    ? t("missionActions.reassignArrivalFato")
                    : t("missionActions.assignArrivalFato")}
            </Button>
            <Button
                leftIcon={<Icon icon="infoLight" />}
                variant="ghost"
                size="lg"
                onClick={() => {
                    setActionsPadState("arrivalStand");
                    onOpenPadAssignmentModal();
                    onClosePopover();
                }}
            >
                {mission.scheduledArrivalStandId
                    ? t("missionActions.reassignArrivalStand")
                    : t("missionActions.assignArrivalStand")}
            </Button>
            <MissionPadAssignmentModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isPadAssignmentModalOpen}
                onClose={onClosePadAssignmentModal}
                actionsPadState={actionsPadState}
            />
        </>
    );
};
