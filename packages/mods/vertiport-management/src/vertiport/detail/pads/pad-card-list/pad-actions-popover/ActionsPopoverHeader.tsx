import type { PopoverHeaderProps } from "@volocopter/design-library-react";
import { Popover } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useVertiportTranslation } from "../../../../../translations/useVertiportTranslation";
import { useActionsPopover } from "./popover-context/useActionsPopover";

export const ActionsPopoverHeader = () => {
    const { actionsPopoverState } = useActionsPopover();
    const { t } = useVertiportTranslation();

    const popoverHeaderProps: PopoverHeaderProps = match(actionsPopoverState)
        .with("actions", () => ({ closeButtonAriaLabel: t("buttons.close"), title: t("fatoStand.actions.label") }))
        .with("delete", () => ({
            closeButtonAriaLabel: t("buttons.close"),
            title: t("buttons.delete"),
            subtitle: t("fatoStand.label"),
        }))
        .exhaustive();

    return <Popover.Header {...popoverHeaderProps} />;
};
