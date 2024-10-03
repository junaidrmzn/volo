import { useState } from "react";
import { match } from "ts-pattern";
import type { Status } from "./UpdateStatusForm";
import { useUpdateStatusModalTranslation } from "./translations/useUpdateStatusModalTranslation";

export type UseStatusOptionsOptions = {
    status: Status;
};

export const useStatusOptions = (options: UseStatusOptionsOptions) => {
    const { status } = options;
    const { t } = useUpdateStatusModalTranslation();

    const allSelectOptions = {
        DRAFT: { label: t("Draft"), value: "DRAFT" },
        "FLIGHT TEST REVIEW": { label: t("Flight Test Review"), value: "FLIGHT TEST REVIEW" },
        "ENGINEERING REVIEW": { label: t("Engineering Review"), value: "ENGINEERING REVIEW" },
        "TECHNICAL APPROVAL": { label: t("Technical Approval"), value: "TECHNICAL APPROVAL" },
        "SAFETY APPROVAL": { label: t("Safety Release"), value: "SAFETY APPROVAL" },
    } as const;

    const availableOptions = match(status)
        .with("DRAFT", () => ["DRAFT", "FLIGHT TEST REVIEW"] as const)
        .with("FLIGHT TEST REVIEW", () => ["DRAFT", "FLIGHT TEST REVIEW", "ENGINEERING REVIEW"] as const)
        .with(
            "ENGINEERING REVIEW",
            () => ["DRAFT", "FLIGHT TEST REVIEW", "ENGINEERING REVIEW", "TECHNICAL APPROVAL"] as const
        )
        .with(
            "TECHNICAL APPROVAL",
            () =>
                ["DRAFT", "FLIGHT TEST REVIEW", "ENGINEERING REVIEW", "TECHNICAL APPROVAL", "SAFETY APPROVAL"] as const
        )
        .with("SAFETY APPROVAL", () => ["SAFETY APPROVAL"] as const)
        .exhaustive();

    const selectOptions = availableOptions.map((selectOption) => allSelectOptions[selectOption]);

    const [selectedOption, setSelectedOption] = useState(allSelectOptions[status]);

    return { selectOptions, selectedOption, setSelectedOption };
};
