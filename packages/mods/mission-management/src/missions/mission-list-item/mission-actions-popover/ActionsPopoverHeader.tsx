import type { PopoverHeaderProps } from "@volocopter/design-library-react";
import { Popover } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type ActionsPopoverHeaderProps = {
    mission: Mission;
};
export const ActionsPopoverHeader = (props: ActionsPopoverHeaderProps) => {
    const { mission } = props;
    const { actionsPopoverState } = useActionsPopover();
    const { t } = useMissionTranslations();

    const popoverHeaderProps: PopoverHeaderProps = match(actionsPopoverState)
        .with("actions", () => ({
            closeButtonAriaLabel: t("buttons.close"),
            title: t("missionActions.label"),
        }))
        .with("cancel", () => ({
            closeButtonAriaLabel: t("buttons.close"),
            title: t("missionActions.cancel"),
            subtitle: t("missionActions.missionLabel", { mission: mission.flightNumber }),
        }))
        .exhaustive();

    return <Popover.Header {...popoverHeaderProps} />;
};
