import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useTolerancesSectionTranslation } from "./translations/useTolerancesSectionTranslation";

export type TolerancesSectionContentProps = {
    testPointTolerance?: string;
};

export const TolerancesSectionContent = (props: TolerancesSectionContentProps) => {
    const { testPointTolerance } = props;
    const { t } = useTolerancesSectionTranslation();

    return (
        <TextWithLabel
            unknownValueText="-"
            size="small"
            label={t("Tolerance")}
            text={<EditorTextDisplay document={testPointTolerance} />}
        />
    );
};
