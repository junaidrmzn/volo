import { HStack, Tag } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useStatusTagTranslation } from "./translations/useStatusTagTranslation";

export type StatusTagProps = {
    status: "DRAFT" | "FLIGHT TEST REVIEW" | "ENGINEERING REVIEW" | "TECHNICAL APPROVAL" | "SAFETY APPROVAL";
};

export const StatusTag = (props: StatusTagProps) => {
    const { status } = props;

    const { t } = useStatusTagTranslation();

    return (
        <HStack spacing={6} height="2rem">
            <Tag
                colorScheme={match(status)
                    .with("DRAFT", () => "gray" as const)
                    .with("FLIGHT TEST REVIEW", () => "blue" as const)
                    .with("ENGINEERING REVIEW", () => "blue" as const)
                    .with("TECHNICAL APPROVAL", () => "blue" as const)
                    .with("SAFETY APPROVAL", () => "blue" as const)
                    .exhaustive()}
            >
                {match(status)
                    .with("DRAFT", () => t("Draft"))
                    .with("FLIGHT TEST REVIEW", () => t("Flight Test Review"))
                    .with("ENGINEERING REVIEW", () => t("Engineering Review"))
                    .with("TECHNICAL APPROVAL", () => t("Technical Approval"))
                    .with("SAFETY APPROVAL", () => t("Safety Release"))
                    .exhaustive()}
            </Tag>
        </HStack>
    );
};
