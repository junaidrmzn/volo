import { useState } from "react";
import type { ApproachDirection } from "@voloiq/vertiport-management-api/v1";

export const useApproachDirections = () => {
    const [approachDirections, setApproachDirections] = useState<(ApproachDirection & { editMode: boolean })[]>([
        { direction: 0, editMode: false },
    ]);
    const [approachDirectionsDisplayValues, setApproachDirectionsDisplayValues] = useState<{ direction: string }[]>([
        { direction: "0" },
    ]);

    const handleDelete = (index: number) => {
        const newApproachDirections = [...approachDirections];
        newApproachDirections.splice(index, 1);
        setApproachDirections(newApproachDirections);
    };

    const toggleEditMode = (index: number) => {
        const newApproachDirections = [...approachDirections];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newApproachDirections[index]!.editMode = !newApproachDirections[index]!.editMode;
        setApproachDirections(newApproachDirections);
    };

    const handleChange = (index: number, approachDirection: ApproachDirection) => {
        const newApproachDirections = [...approachDirections];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newApproachDirections[index] = { ...newApproachDirections[index]!, ...approachDirection };
        setApproachDirections(newApproachDirections);
    };

    const handleAdd = () => {
        setApproachDirections([
            {
                direction: 0,
                editMode: true,
            },
            ...approachDirections,
        ]);
        setApproachDirectionsDisplayValues([
            {
                direction: "",
            },
            ...approachDirectionsDisplayValues,
        ]);
    };

    return {
        approachDirections,
        approachDirectionsDisplayValues,
        setApproachDirections,
        setApproachDirectionsDisplayValues,
        handleDelete,
        toggleEditMode,
        handleChange,
        handleAdd,
    };
};
