import { useCallback } from "react";
import type { ApproachDirection } from "@voloiq/vertiport-management-api/v1";
import { isNumber } from "../../utils/number";

type UseApproachDirectionsTableProps = {
    approachDirections: (ApproachDirection & { editMode: boolean })[];
};

export const useApproachDirectionsTable = (props: UseApproachDirectionsTableProps) => {
    const { approachDirections } = props;

    const isValidApproachDirection = useCallback(
        (index: number) => {
            return isNumber(approachDirections[index]?.direction ?? "");
        },
        [approachDirections]
    );

    return {
        isValidApproachDirection,
    };
};
