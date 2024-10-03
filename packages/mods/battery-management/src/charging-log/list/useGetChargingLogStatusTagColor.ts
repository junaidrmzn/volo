import type { ChargingLog } from "@voloiq-typescript-api/battery-management-types";
import { match } from "ts-pattern";

// eslint-disable-next-line no-restricted-syntax
export enum TagColor {
    Teal = "teal",
    WarningSubtle = "warning-subtle",
    ErrorSubtle = "error-subtle",
}

export const useGetChargingLogStatusTagColor = (chargingLog: ChargingLog) => {
    const { uploadStatus } = chargingLog;
    const chargingLogStatusTagColor: TagColor = match({})
        .when(
            () => uploadStatus === "COMPLETE",
            () => TagColor.Teal
        )
        .when(
            () => uploadStatus === "INCOMPLETE",
            () => TagColor.WarningSubtle
        )
        .when(
            () => uploadStatus === "FAILED",
            () => TagColor.ErrorSubtle
        )
        .otherwise(() => TagColor.ErrorSubtle);
    return { chargingLogStatusTagColor };
};
