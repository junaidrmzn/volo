import { Box, Divider, Icon, IconButton, Popover, Portal } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { ActionsPopoverBody } from "./ActionsPopoverBody";
import { ActionsPopoverHeader } from "./ActionsPopoverHeader";
import { useActionsPopover } from "./popover-context/useActionsPopover";

export type ActionsPopoverProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const ActionsPopover = (props: ActionsPopoverProps) => {
    const { mission } = props;
    const { t } = useMissionTranslations();
    const { isPopoverOpen, onClosePopover, onOpenPopover } = useActionsPopover();
    return (
        <Box
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <Popover isOpen={isPopoverOpen} onClose={onClosePopover} onOpen={onOpenPopover} placement="auto">
                <Popover.Trigger>
                    <IconButton aria-label={t("missionActions.label")} variant="ghost" size="lg">
                        <Icon icon="ellipsis" />
                    </IconButton>
                </Popover.Trigger>
                <Popover.Overlay />
                <Portal>
                    <Popover.Content>
                        <ActionsPopoverHeader mission={mission} />
                        <Divider mb={4} />
                        <ActionsPopoverBody {...props} />
                    </Popover.Content>
                </Portal>
            </Popover>
        </Box>
    );
};
