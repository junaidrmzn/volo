import { match } from "ts-pattern";
import {
    PlanConnectionsState,
    PlanStatus,
    PlanSummaryConnectionStatus,
    PlanSummaryCustomItemStatus,
} from "@voloiq/commercial-scheduling-api/v1";

type UsePlanSummaryCardStatusOptions = {
    isDeleted: boolean;
    planSummaryStatus?: PlanSummaryCustomItemStatus;
    planStatus: PlanStatus;
    connectionStatus: PlanSummaryConnectionStatus;
    planConnectionsState: PlanConnectionsState;
};

export const usePlanSummaryCardStatus = (options: UsePlanSummaryCardStatusOptions) => {
    const { planSummaryStatus, planStatus, connectionStatus, planConnectionsState, isDeleted } = options;
    return match(planSummaryStatus)
        .when(
            () => isDeleted,
            () => undefined
        )
        .when(
            () => planStatus === "PUBLISHED",
            () => "secondary" as const
        )
        .when(
            () => planConnectionsState === "ALL_INCONSISTENT",
            () => "error" as const
        )
        .when(
            () => connectionStatus === "INCONSISTENT",
            () => "warning" as const
        )
        .with("DRAFT", () => "base" as const)
        .with("AWAITING_APPROVAL", () => "info" as const)
        .with("APPROVED", () => "success" as const)
        .otherwise(() => undefined);
};
