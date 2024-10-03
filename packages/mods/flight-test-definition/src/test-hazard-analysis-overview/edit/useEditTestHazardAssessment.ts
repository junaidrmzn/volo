import { AxiosError } from "axios";
import { match } from "ts-pattern";
import { TestHazardAssessment, usePatchTestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { FormValues } from "@voloiq/form";
import { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { TestHazardAssessmentFormSchema } from "../add/useTestHazardAssessmentFormSchema";
import { createTestHazardAssessmentPatchFromFormData } from "./TestHazarAssessmentMapping";

export type EditTestHazardsAssessmentsPropsWithOutResourceOverviewProps = {
    onSubmit: (formValues: FormValues<TestHazardAssessmentFormSchema>) => void;
};

export type EditTestHazardsAssessmentsProps = RenderEditHandlerProps<TestHazardAssessment> &
    EditTestHazardsAssessmentsPropsWithOutResourceOverviewProps;

type UseEditTestHazardAssessmentProps = Omit<EditTestHazardsAssessmentsProps, "formRef"> & {};

export const useEditTestHazardAssessment = (props: UseEditTestHazardAssessmentProps) => {
    const { onSubmit, onAfterSubmit, onSubmitError, resource } = props;
    const { sendRequest } = usePatchTestHazardAssessment(resource.id);

    const handleSubmit: EditTestHazardsAssessmentsPropsWithOutResourceOverviewProps["onSubmit"] = (props) => {
        onSubmit();
        sendRequest({ data: createTestHazardAssessmentPatchFromFormData(props) })
            .then(() => onAfterSubmit())
            .catch((error: AxiosError) => {
                const errorKey = match(error.response?.data.error.status)
                    .with("ALREADY_EXISTS", () => "ALREADY_EXISTS" as const)
                    .otherwise(() => "GENERIC" as const);

                onSubmitError(errorKey);
            });
    };

    return { handleSubmit };
};
