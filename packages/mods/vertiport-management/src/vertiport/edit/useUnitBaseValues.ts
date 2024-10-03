import { useState } from "react";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";

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
export const useUnitBaseValues = (resource: Vertiport) => {
    const [baseValues, setBaseValues] = useState<UnitBaseValues>({
        preBatterySwap: resource.operation?.MinGroundTimePre?.batterySwap
            ? String(resource.operation?.MinGroundTimePre?.batterySwap)
            : undefined,
        prePassengerHandling: resource.operation?.MinGroundTimePre?.passengerHandling
            ? String(resource.operation?.MinGroundTimePre?.passengerHandling)
            : undefined,
        prePilotBriefing: resource.operation?.MinGroundTimePre?.pilotBriefing
            ? String(resource.operation?.MinGroundTimePre?.pilotBriefing)
            : undefined,
        preVtolHandling: resource.operation?.MinGroundTimePre?.vtolHandling
            ? String(resource.operation?.MinGroundTimePre?.vtolHandling)
            : undefined,
        postBatterySwap: resource.operation?.MinGroundTimePost?.batterySwap
            ? String(resource.operation?.MinGroundTimePost?.batterySwap)
            : undefined,
        postPassengerHandling: resource.operation?.MinGroundTimePost?.passengerHandling
            ? String(resource.operation?.MinGroundTimePost?.passengerHandling)
            : undefined,
        postPilotBriefing: resource.operation?.MinGroundTimePost?.pilotBriefing
            ? String(resource.operation?.MinGroundTimePost?.pilotBriefing)
            : undefined,
        postVtolHandling: resource.operation?.MinGroundTimePost?.vtolHandling
            ? String(resource.operation?.MinGroundTimePost?.vtolHandling)
            : undefined,
        fatoBlockingTimePost: resource.operation?.fatoBlockingTimePost
            ? String(resource.operation?.fatoBlockingTimePost)
            : undefined,
        fatoBlockingTimePre: resource.operation?.fatoBlockingTimePre
            ? String(resource.operation?.fatoBlockingTimePre)
            : undefined,
        elevation: String(resource.elevation),
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
