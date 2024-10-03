import type { ReactNode } from "react";
import { AssignmentsPopoverContext } from "./AssignmentsPopoverContext";
import { useAssignmentsPopoverState } from "./useAssignmentsPopoverState";

type AssignmentsPopoverProviderProps = {
    children: ReactNode;
};

export const AssignmentsPopoverProvider = (props: AssignmentsPopoverProviderProps) => {
    const { children } = props;
    const { assignmentsPopoverState, setAssignmentsPopoverState, showPilotFtlTable, setShowPilotFtlTable } =
        useAssignmentsPopoverState();

    return (
        <AssignmentsPopoverContext.Provider
            value={{
                assignmentsPopoverState,
                setAssignmentsPopoverState,
                showPilotFtlTable,
                setShowPilotFtlTable,
            }}
        >
            {children}
        </AssignmentsPopoverContext.Provider>
    );
};
