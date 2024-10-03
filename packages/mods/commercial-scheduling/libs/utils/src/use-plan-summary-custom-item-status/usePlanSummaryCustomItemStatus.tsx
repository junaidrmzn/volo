import { match } from "ts-pattern";
import { PlanSummaryCustomItemStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanSummaryCustomItemStatusTranslation } from "./translations/usePlanSummaryCustomItemStatusTranslation";

type UsePlanSummaryCustomItemStatusOptions = {
    status?: PlanSummaryCustomItemStatus;
    isCustomOverwritten?: boolean;
};

export const usePlanSummaryCustomItemStatus = (options: UsePlanSummaryCustomItemStatusOptions) => {
    const { status, isCustomOverwritten } = options;
    const { t } = usePlanSummaryCustomItemStatusTranslation();

    return match(status)
        .with("DRAFT", () => ({
            variant: "gray-subtle" as const,
            text: t("Draft"),
        }))
        .with("AWAITING_APPROVAL", () => ({
            variant: "blue-subtle" as const,
            text: t("Awaiting approval"),
        }))
        .with("APPROVED", () => ({
            variant: "teal" as const,
            text: isCustomOverwritten ? t("Overwritten") : t("Approved"),
        }))
        .otherwise(() => ({ variant: "gray-subtle" as const, text: "" }));
};
