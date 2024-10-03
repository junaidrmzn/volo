import { useColorModeValue } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useScheduleColors } from "../useScheduleColors";

export const assignmentStates = ["unassigned", "assigned", "warning"] as const;
export type AssignmentState = typeof assignmentStates[number];
export const useGetAssignmentColor = () => {
    const { warningColor } = useScheduleColors();
    const assignedColor = useColorModeValue("darkBlue.500", "monochrome.300");
    const unassignedColor = useColorModeValue("darkBlue.500", "monochrome.300");

    const getAssignmentColor = (assignmentState: AssignmentState) =>
        match(assignmentState)
            .with("assigned", () => assignedColor)
            .with("unassigned", () => unassignedColor)
            .with("warning", () => warningColor)
            .exhaustive();

    return { getAssignmentColor };
};
