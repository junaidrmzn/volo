import { Popover } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import type { Pad, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { ActionButtons } from "./ActionButtons";
import { DeletePadConfirmationPrompt } from "./delete-pad/DeletePadConfirmationPrompt";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type ActionsPopoverBodyProps = {
    pad: Pad;
    vertiport: Vertiport;
};
export const ActionsPopoverBody = (props: ActionsPopoverBodyProps) => {
    const { pad, vertiport } = props;
    const { actionsPopoverState } = useActionsPopover();
    return (
        <Popover.Body>
            {match(actionsPopoverState)
                .with("actions", () => <ActionButtons pad={pad} vertiport={vertiport} />)
                .with("delete", () => <DeletePadConfirmationPrompt pad={pad} />)
                .exhaustive()}
        </Popover.Body>
    );
};
