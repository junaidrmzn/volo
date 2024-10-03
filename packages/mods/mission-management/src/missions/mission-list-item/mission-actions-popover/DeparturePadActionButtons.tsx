import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { MissionPadAssignmentModal } from "./pad-assignment/MissionPadAssignmentModal";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type DeparturePadActionButtonsProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const DeparturePadActionButtons = (props: DeparturePadActionButtonsProps) => {
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
                    setActionsPadState("departureFato");
                    onOpenPadAssignmentModal();
                    onClosePopover();
                }}
            >
                {mission.scheduledDepartureFatoId
                    ? t("missionActions.reassignDepartureFato")
                    : t("missionActions.assignDepartureFato")}
            </Button>
            <Button
                leftIcon={<Icon icon="infoLight" />}
                variant="ghost"
                size="lg"
                onClick={() => {
                    setActionsPadState("departureStand");
                    onOpenPadAssignmentModal();
                    onClosePopover();
                }}
            >
                {mission.scheduledDepartureStandId
                    ? t("missionActions.reassignDepartureStand")
                    : t("missionActions.assignDepartureStand")}
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
