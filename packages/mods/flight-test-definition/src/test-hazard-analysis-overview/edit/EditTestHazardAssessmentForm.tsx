import React, { MutableRefObject } from "react";
import { TestHazardAssessmentInsert } from "@voloiq/flight-test-definition-api/v1";
import { FormProvider, createFormControl } from "@voloiq/form";
import { getTypedKeys } from "@voloiq/utils";
import { TestHazardAssessmentFormLayout } from "../add/form-layout/TestHazardAssessmentFormLayout";
import { useTestHazardAssessmentFormSchema } from "../add/useTestHazardAssessmentFormSchema";
import { createFormDataFromTestHazardAssessment } from "./TestHazarAssessmentMapping";
import { EditTestHazardsAssessmentsPropsWithOutResourceOverviewProps } from "./useEditTestHazardAssessment";

export type EditTestHazardAssessmentFormProps = {
    initialValues: TestHazardAssessmentInsert;
    formRef: MutableRefObject<HTMLFormElement | null>;
} & EditTestHazardsAssessmentsPropsWithOutResourceOverviewProps;

export const EditTestHazardAssessmentForm = (props: EditTestHazardAssessmentFormProps) => {
    const { formRef, onSubmit, initialValues } = props;
    const schema = useTestHazardAssessmentFormSchema();
    type Schema = typeof schema;
    const FormControl = createFormControl<Schema>();

    const initialFormData = createFormDataFromTestHazardAssessment(initialValues);

    return (
        <FormProvider
            formRef={formRef}
            schema={schema}
            formType="edit"
            onEdit={onSubmit}
            initialValues={initialFormData}
        >
            <TestHazardAssessmentFormLayout>
                <TestHazardAssessmentFormLayout.TitleField>
                    <FormControl fieldName="hazard" />
                </TestHazardAssessmentFormLayout.TitleField>
                {getTypedKeys(schema.fields)
                    .filter((key) => key !== "hazard")
                    .map((key) => (
                        <TestHazardAssessmentFormLayout.Field key={key}>
                            <FormControl fieldName={key} />
                        </TestHazardAssessmentFormLayout.Field>
                    ))}
            </TestHazardAssessmentFormLayout>
        </FormProvider>
    );
};
