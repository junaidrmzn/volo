import { match } from "ts-pattern";
import { PromotionItemStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePromotionItemStatusTranslation } from "./translations/usePromotionItemStatusTranslation";

export type UsePromotionItemStatusOptions = {
    status: PromotionItemStatus;
};

export const usePromotionItemStatus = (options: UsePromotionItemStatusOptions) => {
    const { status } = options;
    const { t } = usePromotionItemStatusTranslation();

    return match(status)
        .with("CREATED", () => ({
            variant: "secondary" as const,
            color: "gray-subtle" as const,
            text: t("Created"),
        }))
        .with("CLAIMED", () => ({
            variant: "base" as const,
            color: "base" as const,
            text: t("Claimed"),
        }))
        .with("REDEEMED", () => ({
            variant: "info" as const,
            color: "info" as const,
            text: t("Redeemed"),
        }))
        .with("INVALIDATED", () => ({
            variant: "error" as const,
            color: "error" as const,
            text: t("Invalidated"),
        }))
        .otherwise(() => ({ variant: "base" as const, color: "base" as const, text: "" }));
};
