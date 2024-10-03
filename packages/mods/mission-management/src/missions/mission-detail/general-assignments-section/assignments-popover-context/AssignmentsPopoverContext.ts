import { createContext } from "react";

export type AssignmentsPopoverState = "aircraft" | "pilot" | "crewMember" | "fato" | "stand";
export type AssignmentsPopoverContextType = {
    assignmentsPopoverState: AssignmentsPopoverState;
    setAssignmentsPopoverState: (popoverState: AssignmentsPopoverState) => void;
    showPilotFtlTable: boolean;
    setShowPilotFtlTable: (popoverState: boolean) => void;
};

export const AssignmentsPopoverContext = createContext<AssignmentsPopoverContextType | undefined>(undefined);
