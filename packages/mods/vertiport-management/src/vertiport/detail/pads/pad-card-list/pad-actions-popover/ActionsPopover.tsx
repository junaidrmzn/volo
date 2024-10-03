import { Icon, IconButton, Popover, Portal } from "@volocopter/design-library-react";
import type { Pad, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../../translations/useVertiportTranslation";
import { ActionsPopoverBody } from "./ActionsPopoverBody";
import { ActionsPopoverHeader } from "./ActionsPopoverHeader";
import { useActionsPopover } from "./popover-context/useActionsPopover";

export type ActionsPopoverProps = {
    pad: Pad;
    vertiport: Vertiport;
};

export const ActionsPopover = (props: ActionsPopoverProps) => {
    const { pad, vertiport } = props;

    const { t } = useVertiportTranslation();
    const { isPopoverOpen, onClosePopover, onOpenPopover } = useActionsPopover();

    return (
        <Popover
            isOpen={isPopoverOpen}
            onClose={onClosePopover}
            onOpen={onOpenPopover}
            closeOnBlur={false}
            placement="auto"
        >
            <Popover.Trigger>
                <IconButton aria-label={t("fatoStand.actions.label")} variant="ghost" size="lg">
                    <Icon icon="ellipsis" />
                </IconButton>
            </Popover.Trigger>
            <Popover.Overlay />
            <Portal>
                <Popover.Content>
                    <ActionsPopoverHeader />
                    <ActionsPopoverBody pad={pad} vertiport={vertiport} />
                </Popover.Content>
            </Portal>
        </Popover>
    );
};
