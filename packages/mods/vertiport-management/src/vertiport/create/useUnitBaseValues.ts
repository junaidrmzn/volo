import { useState } from "react";

export type UnitBaseValues = {
    preBatterySwap?: string;
    prePassengerHandling?: string;
    prePilotBriefing?: string;
    preVtolHandling?: string;
    postBatterySwap?: string;
    postPassengerHandling?: string;
    postPilotBriefing?: string;
    postVtolHandling?: string;
    fatoBlockingTimePre?: string;
    fatoBlockingTimePost?: string;
    elevation?: string;
};
export const useUnitBaseValues = () => {
    const [baseValues, setBaseValues] = useState<UnitBaseValues>({
        preBatterySwap: "",
        prePassengerHandling: "",
        prePilotBriefing: "",
        preVtolHandling: "",
        postBatterySwap: "",
        postPassengerHandling: "",
        postPilotBriefing: "",
        postVtolHandling: "",
        fatoBlockingTimePost: "",
        fatoBlockingTimePre: "",
        elevation: "",
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
