import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { useActionsPopover } from "./popover-context/useActionsPopover";
import { UpdateScheduleModal } from "./update-schedule-mission/UpdateScheduleModal";

type UpdateMissionScheduleButtonProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const UpdateScheduleButton = (props: UpdateMissionScheduleButtonProps) => {
    const { mission, onReloadList } = props;
    const { onClosePopover } = useActionsPopover();

    const {
        isOpen: isUpdateScheduleModalOpen,
        onClose: onCloseUpdateScheduleModal,
        onOpen: onOpenUpdateScheduleModal,
    } = useDisclosure();

    const { t } = useMissionTranslations();

    return (
        <>
            <Button
                leftIcon={<Icon icon="clock" />}
                variant="ghost"
                size="lg"
                onClick={() => {
                    onOpenUpdateScheduleModal();
                    onClosePopover();
                }}
            >
                {t("missionActions.updateSchedule")}
            </Button>
            <UpdateScheduleModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isUpdateScheduleModalOpen}
                onClose={onCloseUpdateScheduleModal}
            />
        </>
    );
};
