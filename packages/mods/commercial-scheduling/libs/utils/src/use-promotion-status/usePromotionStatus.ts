import { match } from "ts-pattern";
import { PromotionStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePromotionStatusTranslation } from "./translations/usePromotionStatusTranslation";

export type UsePromotionStatusOptions = {
    status: PromotionStatus;
};

export const usePromotionStatus = (options: UsePromotionStatusOptions) => {
    const { status } = options;
    const { t } = usePromotionStatusTranslation();

    return match(status)
        .with("DRAFT", () => ({
            variant: "gray-subtle" as const,
            text: t("Draft"),
        }))
        .with("PUBLISHED", () => ({
            variant: "purple" as const,
            text: t("Published"),
        }))
        .otherwise(() => ({ variant: "gray-subtle" as const, text: "" }));
};
export const usePromotionCardStatus = (options: UsePromotionStatusOptions) => {
    const { status } = options;
    const { t } = usePromotionStatusTranslation();

    return match(status)
        .with("DRAFT", () => ({
            variant: "base" as const,
            text: t("Draft"),
        }))
        .with("PUBLISHED", () => ({
            variant: "final" as const,
            text: t("Published"),
        }))
        .otherwise(() => ({ variant: "base" as const, text: "" }));
};
