import { useState } from "react";
import type { AssignmentsPopoverState } from "./AssignmentsPopoverContext";

export const useAssignmentsPopoverState = () => {
    const [assignmentsPopoverState, setAssignmentsPopoverState] = useState<AssignmentsPopoverState>("aircraft");

    const [showPilotFtlTable, setShowPilotFtlTable] = useState<boolean>(false);

    return { assignmentsPopoverState, setAssignmentsPopoverState, showPilotFtlTable, setShowPilotFtlTable };
};
