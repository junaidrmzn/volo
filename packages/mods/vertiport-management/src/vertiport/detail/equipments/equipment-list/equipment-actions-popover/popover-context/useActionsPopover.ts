import { useContext } from "react";
import { ActionsPopoverContext } from "./ActionsPopoverContext";

export const useActionsPopover = () => {
    const context = useContext(ActionsPopoverContext);

    if (context === undefined) {
        throw new Error("useActionsPopover must be used within ActionsPopoverProvider");
    }

    return context;
};
