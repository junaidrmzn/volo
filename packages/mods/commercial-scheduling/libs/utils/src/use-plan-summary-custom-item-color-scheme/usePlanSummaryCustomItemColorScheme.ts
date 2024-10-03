import { match } from "ts-pattern";
import { PlanSummaryCustomItemStatus } from "@voloiq/commercial-scheduling-api/v1";

export const usePlanSummaryCustomItemColorScheme = (status?: PlanSummaryCustomItemStatus) => {
    return match(status)
        .with("DRAFT", () => "gray.300" as const)
        .with("AWAITING_APPROVAL", () => "indigo.150" as const)
        .with("APPROVED", () => "teal.100" as const)
        .otherwise(() => undefined);
};
