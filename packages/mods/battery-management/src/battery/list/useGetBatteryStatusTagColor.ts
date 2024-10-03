import type { Battery } from "@voloiq-typescript-api/battery-management-types";
import { match } from "ts-pattern";

// eslint-disable-next-line no-restricted-syntax
export enum TagColor {
    Teal = "teal",
    WarningSubtle = "warning-subtle",
    ErrorSubtle = "error-subtle",
}

export const useGetBatteryStatusTagColor = (batteryStatus: Battery) => {
    const batteryActStatus = batteryStatus.actStatus;
    const batteryStatusTagColor: TagColor = match({})
        .when(
            () => batteryActStatus === "READY_FOR_FLIGHT" || batteryActStatus === "IN_VTOL",
            () => TagColor.Teal
        )
        .when(
            () =>
                batteryActStatus === "CHARGING" ||
                batteryActStatus === "POST_FLIGHT" ||
                batteryActStatus === "INCONSISTENT" ||
                batteryActStatus === "DISCHARGING" ||
                batteryActStatus === "INSPECTION",
            () => TagColor.WarningSubtle
        )
        .when(
            () => batteryActStatus === "DEACTIVATED" || batteryActStatus === "INCOMPLETE",
            () => TagColor.ErrorSubtle
        )
        .otherwise(() => TagColor.ErrorSubtle);
    return { batteryStatusTagColor };
};
