import { match } from "ts-pattern";
import { PlanConnectionsState, PlanSummaryConnectionStatus } from "@voloiq/commercial-scheduling-api/v1";

export type UseBoxColorOptions = {
    isDeleted: boolean;
    planConnectionsState: PlanConnectionsState;
    planSummaryConnectionStatus: PlanSummaryConnectionStatus;
};
export const useBoxColor = (options: UseBoxColorOptions) => {
    const { planConnectionsState, planSummaryConnectionStatus, isDeleted } = options;

    return match(planSummaryConnectionStatus)
        .when(
            () => isDeleted === true,
            () => undefined
        )
        .when(
            () => planConnectionsState === "ALL_INCONSISTENT",
            () => "semanticErrorSubtle" as const
        )
        .with("INCONSISTENT", () => "semanticWarningSubtle" as const)
        .otherwise(() => undefined);
};
