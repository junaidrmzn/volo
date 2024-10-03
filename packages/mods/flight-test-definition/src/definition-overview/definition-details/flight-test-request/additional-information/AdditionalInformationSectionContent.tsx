import { VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useAdditionalInformationTranslation } from "./translations/useAdditionalInformationTranslation";

export type AdditionalInformationSectionContentProps = {
    specialEquipment?: string;
    dataAnalysisPlan?: string;
    safetyRecommendations?: string;
};
export const AdditionalInformationSectionContent = (props: AdditionalInformationSectionContentProps) => {
    const { specialEquipment, dataAnalysisPlan, safetyRecommendations } = props;
    const { t } = useAdditionalInformationTranslation();

    return (
        <VStack spacing={4} alignItems="stretch">
            <TextWithLabel
                unknownValueText="-"
                size="small"
                label={t("Special Equipment")}
                text={<EditorTextDisplay document={specialEquipment} />}
            />
            <TextWithLabel
                unknownValueText="-"
                size="small"
                label={t("Data Analysis Plan")}
                text={<EditorTextDisplay document={dataAnalysisPlan} />}
            />
            <TextWithLabel
                unknownValueText="-"
                size="small"
                label={t("Safety Recommendations")}
                text={<EditorTextDisplay document={safetyRecommendations} />}
            />
        </VStack>
    );
};
