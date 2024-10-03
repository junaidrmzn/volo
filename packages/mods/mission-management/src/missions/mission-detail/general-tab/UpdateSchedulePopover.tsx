import { Box, Button, Divider, Icon, IconButton, Popover, Portal } from "@volocopter/design-library-react";
import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { UpdateScheduleButton } from "../../mission-list-item/mission-actions-popover/UpdateScheduleButton";
import { ActionsPopoverProvider } from "../../mission-list-item/mission-actions-popover/popover-context/ActionsPopoverProvider";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type UpdateScheduleActionPopoverProps = {
    mission: Mission;
    onReloadList: () => void;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    onRedirectToResource?: () => void;
};

export const UpdateScheduleActionPopover = (props: UpdateScheduleActionPopoverProps) => {
    const { onReloadList, isOpen, onClose, onOpen, mission, onRedirectToResource } = props;
    const { t } = useMissionTranslations();
    return (
        <Box>
            <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="auto">
                {(mission.statusOfMission !== StatusOfMission.CANCELLED || onRedirectToResource) && (
                    <Popover.Trigger>
                        <IconButton aria-label={t("popover.general")} variant="ghost" size="sm">
                            <Icon icon="ellipsis" size={4} />
                        </IconButton>
                    </Popover.Trigger>
                )}
                <Popover.Overlay />
                <Portal>
                    <Popover.Content>
                        <Popover.Header closeButtonAriaLabel={t("buttons.close")} title={t("missionActions.label")} />
                        <Divider mb={4} />
                        <Popover.Body>
                            <ActionsPopoverProvider>
                                {mission.statusOfMission !== StatusOfMission.CANCELLED && (
                                    <UpdateScheduleButton mission={mission} onReloadList={onReloadList} />
                                )}
                                {onRedirectToResource && (
                                    <Button
                                        leftIcon={<Icon icon="internalLink" />}
                                        variant="ghost"
                                        size="lg"
                                        aria-label={t("FTL.goToResource")}
                                        onClick={onRedirectToResource}
                                    >
                                        {t("FTL.goToResource")}
                                    </Button>
                                )}
                            </ActionsPopoverProvider>
                        </Popover.Body>
                    </Popover.Content>
                </Portal>
            </Popover>
        </Box>
    );
};
