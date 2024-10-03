import { match } from "ts-pattern";
import { OfferStatus } from "@voloiq/commercial-scheduling-api/v1";
import { useOfferStatusTranslation } from "./translations/useOfferStatusTranslation";

export type UseOfferStatusOptions = {
    status: OfferStatus;
};

export const useOfferStatus = (options: UseOfferStatusOptions) => {
    const { status } = options;
    const { t } = useOfferStatusTranslation();

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
