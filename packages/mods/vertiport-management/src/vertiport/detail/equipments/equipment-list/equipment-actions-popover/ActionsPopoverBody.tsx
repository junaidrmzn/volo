import { Popover } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import type { Equipment, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { ActionButtons } from "./ActionButtons";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type ActionsPopoverBodyProps = {
    equipment: Equipment;
    vertiport: Vertiport;
    refetchData: () => void;
};
export const ActionsPopoverBody = (props: ActionsPopoverBodyProps) => {
    const { equipment, vertiport, refetchData } = props;
    const { actionsPopoverState } = useActionsPopover();
    return (
        <Popover.Body>
            {match(actionsPopoverState)
                .with("actions", () => (
                    <ActionButtons equipment={equipment} vertiport={vertiport} refetchData={refetchData} />
                ))
                .exhaustive()}
        </Popover.Body>
    );
};
