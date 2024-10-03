import { Box } from "@volocopter/design-library-react";
import { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { RenderEditHandler } from "@voloiq/resource-overview";
import { TextWithLabel } from "@voloiq/text-layouts";
import { LinkedDefinitionsListing } from "../preview/LinkedDefinitionsListing";
import { useTestHazardAssessmentMachineConfigTranslation } from "../translations/useTestHazardAssessmentMachineConfigTranslation";
import { EditTestHazardAssessmentForm } from "./EditTestHazardAssessmentForm";
import { LinkedFtdBanner } from "./LinkedFtdBanner";
import { useEditTestHazardAssessment } from "./useEditTestHazardAssessment";

export const EditTestHazardAssessment: RenderEditHandler<TestHazardAssessment> = (props) => {
    const { resource, formRef } = props;
    const { linkedDefinitions } = resource;

    const { handleSubmit } = useEditTestHazardAssessment(props);
    const { t } = useTestHazardAssessmentMachineConfigTranslation();

    return (
        <>
            {linkedDefinitions.length > 0 && (
                <>
                    <LinkedFtdBanner />
                    <Box mt={4} p={4} borderWidth="thin" borderRadius="sm" backgroundColor="bgContentLayer">
                        <TextWithLabel
                            label={t("linkedFtdtitle", { count: linkedDefinitions.length })}
                            text={<LinkedDefinitionsListing linkedDefinitions={linkedDefinitions} />}
                        />
                    </Box>
                </>
            )}
            <Box mt={4} p={4} borderWidth="thin" borderRadius="sm" backgroundColor="bgContentLayer">
                <EditTestHazardAssessmentForm formRef={formRef} onSubmit={handleSubmit} initialValues={resource} />
            </Box>
        </>
    );
};
