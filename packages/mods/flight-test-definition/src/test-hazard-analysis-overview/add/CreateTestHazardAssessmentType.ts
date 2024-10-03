import { FormValues } from "@voloiq/form";
import { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useTestHazardAssessmentFormSchema } from "./useTestHazardAssessmentFormSchema";

export type CreateTestHazardAssessmentProps = RenderAddHandlerProps & {
    onSubmit: (formValues: FormValues<ReturnType<typeof useTestHazardAssessmentFormSchema>>) => void;
};
