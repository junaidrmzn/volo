import { match } from "ts-pattern";
import { ScheduleItemStatus } from "@voloiq/commercial-scheduling-api/v1";
import { useScheduleItemStatusTranslation } from "./translations/useScheduleItemStatusTranslation";

export type UseScheduleItemStatusOptions = {
    status: ScheduleItemStatus;
};

export const useScheduleItemStatus = (options: UseScheduleItemStatusOptions) => {
    const { status } = options;
    const { t } = useScheduleItemStatusTranslation();

    return match(status)
        .with("DRAFT", () => t("Draft"))
        .with("ORDERED", () => t("Ordered"))
        .with("PLANNED", () => t("Planned"))
        .with("OFFERED", () => t("Offered"))
        .with("BOOKED", () => t("Booked"))
        .with("CANCELLED", () => t("Cancelled"))
        .with("CLOSED", () => t("Closed"))
        .otherwise(() => "");
};
