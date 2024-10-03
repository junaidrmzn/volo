import React, { ReactElement } from "react";
import { ArrayFormControlProps } from "@voloiq/form";
import { getTypedKeys } from "@voloiq/utils";
import { BaseTestHazardAssessmentFormProps } from "../BulkCreateTestHazardAssessmentMapping";
import { TestHazardAssessmentFormSchema } from "../useTestHazardAssessmentFormSchema";
import { TestHazardAssessmentFormLayout } from "./TestHazardAssessmentFormLayout";

export type BulkCreateTestHazardAssessmentFormProps = Omit<BaseTestHazardAssessmentFormProps, "onSubmit"> & {
    FormControl: (props: ArrayFormControlProps<TestHazardAssessmentFormSchema>) => ReactElement | null;
    schema: TestHazardAssessmentFormSchema;
};

export const BulkCreateTestHazardAssessmentForm = (props: BulkCreateTestHazardAssessmentFormProps) => {
    const { FormControl, schema } = props;
    return (
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
    );
};
