import { match } from "ts-pattern";
import { ScheduleStatus } from "@voloiq/commercial-scheduling-api/v1";
import { useScheduleStatusTranslation } from "./translations/useScheduleStatusTranslation";

export type UseScheduleStatusOptions = {
    status: ScheduleStatus;
};

export const useScheduleStatus = (options: UseScheduleStatusOptions) => {
    const { status } = options;
    const { t } = useScheduleStatusTranslation();

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
        .otherwise(() => ({ variant: "gray-subtle" as const, text: "" }));
};
