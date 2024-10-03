import { Popover } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import type { Pad, PadEvent } from "@voloiq/vertiport-management-api/v1";
import { PadProvider } from "../../pad-card-list/pad-actions-popover/pad-context/PadProvider";
import { PadEventsProvider } from "../../pad-card-list/pad-actions-popover/pad-events/pad-events-context/PadEventsProvider";
import { ActionButtons } from "./ActionButtons";
import { DeletePadEventConfirmationPrompt } from "./delete-event/DeletePadEventConfirmationPrompt";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type ActionsPopoverBodyProps = {
    pad: Pad;
    padEvent: PadEvent;
};
export const ActionsPopoverBody = (props: ActionsPopoverBodyProps) => {
    const { pad, padEvent } = props;
    const { actionsPopoverState } = useActionsPopover();
    return (
        <Popover.Body>
            {match(actionsPopoverState)
                .with("actions", () => <ActionButtons />)
                .with("delete", () => (
                    <PadProvider pad={pad}>
                        <PadEventsProvider>
                            <DeletePadEventConfirmationPrompt padEvent={padEvent} />
                        </PadEventsProvider>
                    </PadProvider>
                ))
                .exhaustive()}
        </Popover.Body>
    );
};
