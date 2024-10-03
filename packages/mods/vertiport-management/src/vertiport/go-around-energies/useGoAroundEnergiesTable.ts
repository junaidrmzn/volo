import { useCallback } from "react";
import type { GoAroundEnergy } from "@voloiq/vertiport-management-api/v1";
import { isNumber } from "../../utils/number";

type UseGoAroundEnergiesTableProps = {
    goAroundEnergies: (GoAroundEnergy & { editMode: boolean })[];
};

export const useGoAroundEnergiesTable = (props: UseGoAroundEnergiesTableProps) => {
    const { goAroundEnergies } = props;

    const isValidGoAroundEnergy = useCallback(
        (index: number) => {
            return (
                isNumber(goAroundEnergies[index]?.direction ?? "") &&
                isNumber(goAroundEnergies[index]?.goAroundEnergy ?? "")
            );
        },
        [goAroundEnergies]
    );

    return {
        isValidGoAroundEnergy,
    };
};
