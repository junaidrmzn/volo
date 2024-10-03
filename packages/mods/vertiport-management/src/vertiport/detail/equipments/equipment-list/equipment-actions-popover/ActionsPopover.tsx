import { Icon, IconButton, Popover, Portal } from "@volocopter/design-library-react";
import type { Equipment, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../../translations/useVertiportTranslation";
import { ActionsPopoverBody } from "./ActionsPopoverBody";
import { ActionsPopoverHeader } from "./ActionsPopoverHeader";
import { useActionsPopover } from "./popover-context/useActionsPopover";

export type ActionsPopoverProps = {
    equipment: Equipment;
    vertiport: Vertiport;
    refetchData: () => void;
};

export const ActionsPopover = (props: ActionsPopoverProps) => {
    const { equipment, vertiport, refetchData } = props;

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
                <IconButton aria-label={t("equipment.actions.label")} variant="ghost" size="sm">
                    <Icon icon="ellipsis" size={4} />
                </IconButton>
            </Popover.Trigger>
            <Popover.Overlay />
            <Portal>
                <Popover.Content>
                    <ActionsPopoverHeader />
                    <ActionsPopoverBody equipment={equipment} vertiport={vertiport} refetchData={refetchData} />
                </Popover.Content>
            </Portal>
        </Popover>
    );
};
