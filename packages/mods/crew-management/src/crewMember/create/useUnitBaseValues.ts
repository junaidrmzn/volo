import { useState } from "react";

export type UnitBaseValues = {
    weight?: string;
};
export const useUnitBaseValues = () => {
    const [baseValues, setBaseValues] = useState<UnitBaseValues>({
        weight: "",
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
