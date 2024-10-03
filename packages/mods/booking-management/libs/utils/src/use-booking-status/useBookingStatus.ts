import { match } from "ts-pattern";
import { BookingStatus } from "@voloiq/booking-management-api/v1";
import { useBookingStatusTranslation } from "./translations/useBookingStatusTranslation";

export type UseBookingStatusOptions = {
    status: BookingStatus;
};

export const useBookingStatus = (options: UseBookingStatusOptions) => {
    const { status } = options;
    const { t } = useBookingStatusTranslation();

    return match(status)
        .with("VALID", () => ({
            variant: "teal-subtle" as const,
            text: t("valid"),
        }))
        .with("RESERVED", () => ({
            variant: "warning-subtle" as const,
            text: t("reserved"),
        }))
        .with("CANCELLED", () => ({
            variant: "error-subtle" as const,
            text: t("cancelled"),
        }))
        .otherwise(() => ({ variant: "gray-subtle" as const, text: "" }));
};
