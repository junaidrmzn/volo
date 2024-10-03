import { match } from "ts-pattern";
import type { FlightTestOrderStatus } from "@voloiq/flight-test-definition-api/v2";
import { useFlightTestOrderStatusTagTranslation } from "./translations/useDefinitionStatusTagTranslation";

export type useGetFlightTestOrderStatusTagProps = {
    status: FlightTestOrderStatus;
};

export const useGetFlightTestOrderStatusTag = (props: useGetFlightTestOrderStatusTagProps) => {
    const { status = "DRAFT" } = props;
    const { t } = useFlightTestOrderStatusTagTranslation();

    const { color, label } = match(status)
        .with("DRAFT", () => ({ color: "gray" as const, label: t("Draft") }))
        .with("APPROVED", () => ({ color: "blue" as const, label: t("Approved") }))
        .with("AWAITING_APPROVAL", () => ({ color: "blue" as const, label: t("Awaiting Approval") }))
        .with("CANCELLED", () => ({ color: "error" as const, label: t("Cancelled") }))
        .with("EXECUTED", () => ({ color: "purple" as const, label: t("Executed") }))
        .with("RELEASED", () => ({ color: "success" as const, label: t("Released") }))
        .exhaustive();

    return { colorScheme: color, label };
};
