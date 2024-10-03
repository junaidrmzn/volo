import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { MissionCreateSource, Service } from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { AcceptMissionModal } from "./accept-mission/AcceptMissionModal";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type AcceptMissionButtonProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const AcceptMissionButton = (props: AcceptMissionButtonProps) => {
    const { mission, onReloadList } = props;
    const { t } = useMissionTranslations();
    const {
        isOpen: isAcceptMissionModalOpen,
        onClose: onCloseAcceptMissionModal,
        onOpen: onOpenAcceptMissionModal,
    } = useDisclosure();
    const { onClosePopover } = useActionsPopover();

    return (
        <>
            {mission.service === Service.PASSENGER &&
                !mission.synchronizedWithLeon &&
                mission.source === MissionCreateSource.COMMERCIAL_SCHEDULE &&
                !mission.subProcess?.airlineAcceptanceDone && (
                    <Button
                        leftIcon={<Icon icon="check" />}
                        variant="ghost"
                        size="lg"
                        onClick={() => {
                            onOpenAcceptMissionModal();
                            onClosePopover();
                        }}
                    >
                        {t("missionActions.acceptMission")}
                    </Button>
                )}
            <AcceptMissionModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isAcceptMissionModalOpen}
                onClose={onCloseAcceptMissionModal}
            />
        </>
    );
};
