import { Box, Divider, Icon, IconButton, Popover, Portal } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { RouteOptionsButton } from "../../mission-list-item/mission-actions-popover/RouteOptionsButton";
import { ActionsPopoverProvider } from "../../mission-list-item/mission-actions-popover/popover-context/ActionsPopoverProvider";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type RouteOptonsPopoverProps = {
    mission: Mission;
    onReloadList: () => void;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const RouteOptionsPopover = (props: RouteOptonsPopoverProps) => {
    const { onReloadList, isOpen, onClose, onOpen, mission } = props;
    const { t } = useMissionTranslations();

    return (
        <Box>
            <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="auto">
                <Popover.Trigger>
                    <IconButton aria-label={t("popover.general")} variant="ghost" size="lg">
                        <Icon icon="ellipsis" size={4} />
                    </IconButton>
                </Popover.Trigger>
                <Popover.Overlay />
                <Portal>
                    <Popover.Content>
                        <Popover.Header closeButtonAriaLabel={t("buttons.close")} title={t("missionActions.label")} />
                        <Divider mb={4} />
                        <Popover.Body>
                            <ActionsPopoverProvider>
                                <RouteOptionsButton mission={mission} onReloadList={onReloadList} />
                            </ActionsPopoverProvider>
                        </Popover.Body>
                    </Popover.Content>
                </Portal>
            </Popover>
        </Box>
    );
};
