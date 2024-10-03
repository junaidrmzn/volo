import { useState } from "react";
import type { PopoverState } from "./ActionsPopoverContext";

export const useActionsPopoverState = () => {
    const [actionsPopoverState, setActionsPopoverState] = useState<PopoverState>("actions");

    return { actionsPopoverState, setActionsPopoverState };
};
