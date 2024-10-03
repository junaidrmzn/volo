import { useContext } from "react";
import { AssignmentsPopoverContext } from "./AssignmentsPopoverContext";

export const useAssignmentsPopover = () => {
    const context = useContext(AssignmentsPopoverContext);

    if (context === undefined) {
        throw new Error("useAssignmentsPopover must be used within AssignmentsPopoverProvider");
    }

    return context;
};
