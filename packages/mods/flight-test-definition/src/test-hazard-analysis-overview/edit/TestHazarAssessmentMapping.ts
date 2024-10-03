import { TestHazardAssessmentInsert, TestHazardAssessmentPatch } from "@voloiq/flight-test-definition-api/v1";
import { FormValues } from "@voloiq/form";
import { TestHazardAssessmentFormSchema } from "../add/useTestHazardAssessmentFormSchema";

export type EditParametersPropsWithOutResourceOverviewProps = {
    onSubmit: (formValues: FormValues<TestHazardAssessmentFormSchema>) => void;
};

export const createFormDataFromTestHazardAssessment = (
    formData: TestHazardAssessmentInsert
): Parameters<EditParametersPropsWithOutResourceOverviewProps["onSubmit"]>[0] => ({
    hazard: formData.hazard,
    preMitigationRiskLevel: { value: formData.preMitigationRiskLevel },
    residualRiskLevel: { value: formData.residualRiskLevel },
    hazardGroup: { value: formData.hazardGroup },
    applicability: { value: formData.applicability },
});

export const createTestHazardAssessmentPatchFromFormData = (
    formData: Parameters<EditParametersPropsWithOutResourceOverviewProps["onSubmit"]>[0]
): TestHazardAssessmentPatch => ({
    hazard: formData.hazard,
    preMitigationRiskLevel: formData.preMitigationRiskLevel.value,
    residualRiskLevel: formData.residualRiskLevel.value,
    hazardGroup: formData.hazardGroup.value,
    applicability: formData.applicability.value,
});
