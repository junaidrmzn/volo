import type { CrewMember } from "@voloiq-typescript-api/crew-api-types";
import { useState } from "react";

export type UnitBaseValues = {
    weight?: string;
};
export const useUnitBaseValues = (resource?: CrewMember) => {
    const [baseValues, setBaseValues] = useState<UnitBaseValues>({
        weight: resource?.weight ? String(resource.weight) : undefined,
    });

    const handleBaseValueUpdate = (key: keyof UnitBaseValues, value: string) => {
        const newBaseValues = baseValues;
        newBaseValues[key] = value;
        setBaseValues(newBaseValues);
    };

    return {
        baseValues,
        handleBaseValueUpdate,
    };
};
