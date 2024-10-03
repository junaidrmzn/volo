import { useDisclosure } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { PadAssignmentPopover } from "./PadAssignmentPopover";

type ActionsPopoverState = "departurePad" | "arrivalPad";
type ActionPopoverProps = {
    mission: Mission;
    onReloadList: () => void;
    type: ActionsPopoverState;
};

export const ActionPopover = (props: ActionPopoverProps) => {
    const { onReloadList, type, mission } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <PadAssignmentPopover
            mission={mission}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onReloadList={onReloadList}
            type={type}
        />
    );
};
