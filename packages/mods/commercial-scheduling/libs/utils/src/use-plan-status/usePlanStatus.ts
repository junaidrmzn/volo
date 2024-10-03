import { match } from "ts-pattern";
import { PlanStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanStatusTranslation } from "./translations/usePlanStatusTranslation";

export type UsePlanStatusOptions = {
    status: PlanStatus;
};

export const usePlanStatus = (options: UsePlanStatusOptions) => {
    const { status } = options;
    const { t } = usePlanStatusTranslation();

    return match(status)
        .with("DRAFT", () => ({
            variant: "gray-subtle" as const,
            text: t("Draft"),
        }))
        .with("AWAITING_APPROVAL", () => ({
            variant: "blue-subtle" as const,
            text: t("Awaiting Approval"),
        }))
        .with("APPROVED", () => ({
            variant: "teal-subtle" as const,
            text: t("Approved"),
        }))
        .with("PUBLISHED", () => ({
            variant: "purple-subtle" as const,
            text: t("Published"),
        }))
        .otherwise(() => ({ variant: "gray-subtle" as const, text: "" }));
};
