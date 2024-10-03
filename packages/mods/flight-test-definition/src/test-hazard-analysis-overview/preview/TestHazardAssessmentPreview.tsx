import { VStack } from "@volocopter/design-library-react";
import { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useTestHazardAssessmentUtils } from "../utils/useTestHazardAssessmentUtils";
import { LinkedDefinitionsListing } from "./LinkedDefinitionsListing";
import { useTestHazardAssessmentPreviewTranslation } from "./translations/useTestHazardAssessmentPreviewTranslations";

export type TestHazardPreviewProps = {
    testHazard: TestHazardAssessment;
};

export const TestHazardAssessmentPreview = (props: TestHazardPreviewProps) => {
    const { testHazard } = props;
    const { hazard, preMitigationRiskLevel, residualRiskLevel, hazardGroup, applicability, linkedDefinitions } =
        testHazard;
    const { t } = useTestHazardAssessmentPreviewTranslation();
    const { getTestHazardApplicability, getTestHazardGroup, getTestHazardLevel } = useTestHazardAssessmentUtils();

    return (
        <VStack alignItems="baseline" spacing="8">
            <PreviewSection headerLabel={t("general")}>
                <PreviewSectionItem label={t("title")} text={hazard} fullWidth />
                <PreviewSectionItem label={t("hazard-group.title")} text={getTestHazardGroup(hazardGroup)} />
                <PreviewSectionItem label={t("applicability.title")} text={getTestHazardApplicability(applicability)} />
                <PreviewSectionItem
                    label={t("risk-level-pre-mitigation")}
                    text={getTestHazardLevel(preMitigationRiskLevel)}
                />
                <PreviewSectionItem label={t("risk-level-residual")} text={getTestHazardLevel(residualRiskLevel)} />
            </PreviewSection>
            {linkedDefinitions.length > 0 && (
                <PreviewSectionItem
                    label={t("ftd-linked", { count: linkedDefinitions.length })}
                    text={<LinkedDefinitionsListing linkedDefinitions={linkedDefinitions} />}
                />
            )}
        </VStack>
    );
};
