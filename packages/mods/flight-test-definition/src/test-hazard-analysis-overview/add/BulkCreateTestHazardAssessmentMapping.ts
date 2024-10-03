import { TestHazardAssessmentInsert } from "@voloiq/flight-test-definition-api/v1";
import { FormValues } from "@voloiq/form";
import { TestHazardAssessmentFormSchema } from "./useTestHazardAssessmentFormSchema";

export type BaseTestHazardAssessmentFormProps = {
    onSubmit: (formValues: FormValues<TestHazardAssessmentFormSchema>) => void;
};

export const createTestHazardAssessmentInsertFromBulkFormData = (
    formData: Parameters<BaseTestHazardAssessmentFormProps["onSubmit"]>[0]
): TestHazardAssessmentInsert => ({
    hazard: formData.hazard,
    preMitigationRiskLevel: formData?.preMitigationRiskLevel?.value,
    residualRiskLevel: formData.residualRiskLevel?.value,
    hazardGroup: formData.hazardGroup?.value,
    applicability: formData.applicability?.value,
});
