import { Popover } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { ActionButtons } from "./ActionButtons";
import { CancelMissionConfirmationPrompt } from "./cancel-mission/CancelMissionConfirmationPrompt";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type ActionsPopoverBodyProps = {
    mission: Mission;
    onReloadList: () => void;
};
export const ActionsPopoverBody = (props: ActionsPopoverBodyProps) => {
    const { actionsPopoverState } = useActionsPopover();
    return (
        <Popover.Body>
            {match(actionsPopoverState)
                .with("actions", () => <ActionButtons {...props} />)
                .with("cancel", () => <CancelMissionConfirmationPrompt {...props} />)
                .exhaustive()}
        </Popover.Body>
    );
};
