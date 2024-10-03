import type { ChargingStation } from "@voloiq-typescript-api/battery-management-types";
import { match } from "ts-pattern";

// eslint-disable-next-line no-restricted-syntax
export enum TagColor {
    Teal = "teal",
    WarningSubtle = "warning-subtle",
    ErrorSubtle = "error-subtle",
}

export const useGetChargingStationStatusTagColor = (chargingStation: ChargingStation) => {
    const { chargingStationStatus } = chargingStation;
    const chargingStationStatusTagColor: TagColor = match({})
        .when(
            () => chargingStationStatus === "IN_OPERATION",
            () => TagColor.Teal
        )
        .when(
            () => chargingStationStatus === "OFF",
            () => TagColor.WarningSubtle
        )
        .when(
            () => chargingStationStatus === "DEACTIVATED" || chargingStationStatus === "DEFECT",
            () => TagColor.ErrorSubtle
        )
        .otherwise(() => TagColor.ErrorSubtle);
    return { chargingStationStatusTagColor };
};
