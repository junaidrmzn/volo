import { match } from "ts-pattern";
import { PriceStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePriceStatusTranslation } from "./translations/usePriceStatusTranslation";

export type UsePriceStatusOptions = {
    status: PriceStatus;
};

export const usePriceStatus = (options: UsePriceStatusOptions) => {
    const { status } = options;
    const { t } = usePriceStatusTranslation();

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
            variant: "teal-subtle" as const,
            text: t("Approved"),
        }))
        .otherwise(() => ({ variant: "teal" as const, text: "" }));
};
