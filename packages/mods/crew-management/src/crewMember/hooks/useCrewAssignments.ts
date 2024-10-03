import { useState } from "react";
import type { CrewMemberAssignmentObject } from "../../types/CrewMemberAssignmentObject";

export const useCrewAssignments = (initialAssignments: CrewMemberAssignmentObject[]) => {
    const [crewAssignmentObjects, setCrewAssignmentsObjects] =
        useState<CrewMemberAssignmentObject[]>(initialAssignments);

    const [crewAssignmentReverteObjects, setCrewAssignmentsReverteObjects] =
        useState<CrewMemberAssignmentObject[]>(initialAssignments);

    const [revertPossible, setRevertPossible] = useState<boolean>(false);

    const [init, setInit] = useState<boolean>(false);

    const [editModeActive, setEditMode] = useState<boolean>(false);

    const [assignmentIsComplete, setAssignmentIsComplete] = useState<boolean>(false);

    const [callBackAssignmentObject, setCallBackAssignmentObject] =
        useState<CrewMemberAssignmentObject[]>(initialAssignments);

    return {
        crewAssignmentObjects,
        setCrewAssignmentsObjects,
        init,
        setInit,
        editModeActive,
        setEditMode,
        assignmentIsComplete,
        setAssignmentIsComplete,
        crewAssignmentReverteObjects,
        setCrewAssignmentsReverteObjects,
        revertPossible,
        setRevertPossible,
        callBackAssignmentObject,
        setCallBackAssignmentObject,
    };
};
