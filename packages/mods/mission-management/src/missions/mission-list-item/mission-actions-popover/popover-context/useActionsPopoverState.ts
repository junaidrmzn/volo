import { useState } from "react";
import type { PadState, PopoverState } from "./ActionsPopoverContext";

export const useActionsPopoverState = () => {
    const [actionsPopoverState, setActionsPopoverState] = useState<PopoverState>("actions");
    const [actionsPadState, setActionsPadState] = useState<PadState>("arrivalFato");

    return { actionsPopoverState, setActionsPopoverState, actionsPadState, setActionsPadState };
};
