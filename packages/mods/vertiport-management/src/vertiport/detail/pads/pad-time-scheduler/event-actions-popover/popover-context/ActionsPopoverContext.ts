import { createContext } from "react";

export type PopoverState = "actions" | "delete";
export type ActionsPopoverContextType = {
    actionsPopoverState: PopoverState;
    setActionsPopoverState: (popoverState: PopoverState) => void;
    isPopoverOpen: boolean;
    onOpenPopover: () => void;
    onClosePopover: () => void;
};

export const ActionsPopoverContext = createContext<ActionsPopoverContextType | undefined>(undefined);
