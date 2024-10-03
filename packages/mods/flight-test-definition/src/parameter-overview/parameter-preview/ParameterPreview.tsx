import { Box } from "@volocopter/design-library-react";
import type { TestPointParameter } from "@voloiq-typescript-api/ftd-types";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useParameterPreviewTranslation } from "./translations/useParameterPreviewTranslation";

export type ParameterPreviewProps = {
    parameter: TestPointParameter;
};
export const ParameterPreview = (props: ParameterPreviewProps) => {
    const { parameter } = props;
    const { name, acronym, unit } = parameter;

    const { t } = useParameterPreviewTranslation();

    return (
        <Box>
            <PreviewSection headerLabel={t("General")}>
                <PreviewSectionItem label={t("Name")} text={name} />
                <PreviewSectionItem label={t("Acronym")} text={acronym} />
                <PreviewSectionItem label={t("Unit")} text={unit} />
            </PreviewSection>
        </Box>
    );
};
