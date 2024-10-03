import { FlightTestOrderStatus } from "@voloiq/flight-test-definition-api/v2";

export type NonExecutedOrCancelledStatus = Exclude<FlightTestOrderStatus, "EXECUTED" | "CANCELLED">;

export const isNonExecutedOrCancelledStatus = (
    status: FlightTestOrderStatus
): status is NonExecutedOrCancelledStatus => {
    return status !== "EXECUTED" && status !== "CANCELLED";
};
