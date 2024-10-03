import { useState } from "react";
import type { GoAroundEnergy } from "@voloiq/vertiport-management-api/v1";

export const useGoAroundEnergies = () => {
    const [goAroundEnergies, setGoAroundEnergies] = useState<(GoAroundEnergy & { editMode: boolean })[]>([
        { goAroundEnergy: 0, direction: 0, editMode: false },
    ]);
    const [goAroundEnergiesDisplayValues, setGoAroundEnergiesDisplayValues] = useState<
        { direction: string; goAroundEnergy: string }[]
    >([{ direction: "0", goAroundEnergy: "0" }]);

    const handleDelete = (index: number) => {
        const newGoAroundEnergies = [...goAroundEnergies];
        newGoAroundEnergies.splice(index, 1);
        setGoAroundEnergies(newGoAroundEnergies);
    };

    const toggleEditMode = (index: number) => {
        const newGoAroundEnergies = [...goAroundEnergies];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newGoAroundEnergies[index]!.editMode = !newGoAroundEnergies[index]!.editMode;
        setGoAroundEnergies(newGoAroundEnergies);
    };

    const handleChange = (index: number, goAroundEnergy: GoAroundEnergy) => {
        const newGoAroundEnergies = [...goAroundEnergies];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newGoAroundEnergies[index] = { ...newGoAroundEnergies[index]!, ...goAroundEnergy };
        setGoAroundEnergies(newGoAroundEnergies);
    };

    const handleAdd = () => {
        setGoAroundEnergies([
            {
                direction: 0,
                goAroundEnergy: 0,
                editMode: true,
            },
            ...goAroundEnergies,
        ]);
        setGoAroundEnergiesDisplayValues([
            {
                direction: "",
                goAroundEnergy: "",
            },
            ...goAroundEnergiesDisplayValues,
        ]);
    };

    return {
        goAroundEnergies,
        goAroundEnergiesDisplayValues,
        setGoAroundEnergies,
        setGoAroundEnergiesDisplayValues,
        handleDelete,
        toggleEditMode,
        handleChange,
        handleAdd,
    };
};
