import { VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { SafetyLevel } from "@voloiq-typescript-api/ftd-types";
import { match } from "ts-pattern";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useGeneralSectionTranslation } from "./translations/useGeneralSectionTranslation";

export type GeneralSectionContentProps = {
    safetyApprovalLevel?: SafetyLevel;
    objectives?: string;
    prerequisites?: string;
    passFailCriteria?: string;
};

export const GeneralSectionContent = (props: GeneralSectionContentProps) => {
    const { t } = useGeneralSectionTranslation();
    const { objectives, passFailCriteria, prerequisites, safetyApprovalLevel } = props;

    return (
        <VStack spacing={4} alignItems="stretch">
            <TextWithLabel
                unknownValueText="-"
                size="small"
                label={t("Safety Approval")}
                text={match(safetyApprovalLevel)
                    .with(undefined, () => "-")
                    .with("LOW", () => t("Low"))
                    .with("MEDIUM", () => t("Medium"))
                    .with("HIGH", () => t("High"))
                    .exhaustive()}
            />
            <TextWithLabel
                unknownValueText="-"
                size="small"
                label={t("Objectives")}
                text={<EditorTextDisplay document={objectives} />}
            />
            <TextWithLabel
                unknownValueText="-"
                size="small"
                label={t("Prerequisites")}
                text={<EditorTextDisplay document={prerequisites} />}
            />
            <TextWithLabel
                unknownValueText="-"
                size="small"
                label={t("Pass/Fail Criteria")}
                text={<EditorTextDisplay document={passFailCriteria} />}
            />
        </VStack>
    );
};
