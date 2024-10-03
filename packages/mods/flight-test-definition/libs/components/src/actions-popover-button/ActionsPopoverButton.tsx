import { Icon, IconButton, Popover, useDisclosure } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { useActionsPopoverButtonTranslation } from "./translations/useActionsPopoverButtonTranslation";

export type ActionsPopoverButtonProps = {
    renderActionButtons: (onClosePopover: () => void) => ReactElement | null;
    withHeader?: boolean;
    buttonLabel?: string;
};

export const ActionsPopoverButton = (props: ActionsPopoverButtonProps) => {
    const { t } = useActionsPopoverButtonTranslation();
    const { renderActionButtons, withHeader = false, buttonLabel = t("Actions") } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <Popover.Trigger>
                <IconButton aria-label={buttonLabel} variant="ghost" size="sm">
                    <Icon icon="ellipsis" size={4} />
                </IconButton>
            </Popover.Trigger>
            <Popover.Overlay />
            <Popover.Content isFocusLockDisabled minWidth="unset">
                {withHeader && <Popover.Header title={t("Actions")} closeButtonAriaLabel={t("Close Actions")} />}
                <Popover.Body>{renderActionButtons(onClose)}</Popover.Body>
            </Popover.Content>
        </Popover>
    );
};
