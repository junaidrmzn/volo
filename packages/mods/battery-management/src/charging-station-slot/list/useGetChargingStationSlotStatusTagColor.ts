import type { ChargingStationSlot } from "@voloiq-typescript-api/battery-management-types";
import { match } from "ts-pattern";

// eslint-disable-next-line no-restricted-syntax
export enum TagColor {
    Teal = "teal",
    WarningSubtle = "warning-subtle",
    ErrorSubtle = "error-subtle",
}

export const useGetChargingStationSlotStatusTagColor = (chargingStationSlot: ChargingStationSlot) => {
    const { chargingStationSlotStatus } = chargingStationSlot;
    const chargingStationSlotStatusTagColor: TagColor = match({})
        .when(
            () => chargingStationSlotStatus === "IN_OPERATION",
            () => TagColor.Teal
        )
        .when(
            () => chargingStationSlotStatus === "OFF",
            () => TagColor.WarningSubtle
        )
        .when(
            () => chargingStationSlotStatus === "DEACTIVATED" || chargingStationSlotStatus === "DEFECT",
            () => TagColor.ErrorSubtle
        )
        .otherwise(() => TagColor.ErrorSubtle);
    return { chargingStationSlotStatusTagColor };
};
