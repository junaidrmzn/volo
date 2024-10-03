import { createContext } from "react";

export type PopoverState = "actions" | "cancel";
export type PadState = "arrivalFato" | "departureFato" | "arrivalStand" | "departureStand";
export type ActionsPopoverContextType = {
    actionsPopoverState: PopoverState;
    setActionsPopoverState: (popoverState: PopoverState) => void;
    isPopoverOpen: boolean;
    onOpenPopover: () => void;
    onClosePopover: () => void;
    actionsPadState: PadState;
    setActionsPadState: (padState: PadState) => void;
};

export const ActionsPopoverContext = createContext<ActionsPopoverContextType | undefined>(undefined);
