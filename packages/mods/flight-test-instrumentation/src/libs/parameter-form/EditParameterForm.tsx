import type { MutableRefObject } from "react";
import { FormProvider } from "@voloiq/form";
import { FtiParameterFieldsCard } from "../../parameter-overview/edit/FtiParameterFieldsCard";
import { Parameter } from "../fti-api/apiModels";
import { EditParameterFormLayout } from "./EditParameterFormLayout";
import { EditParameterFormProps as EditParameterOptions } from "./ParameterFormType";
import { createFormDataFromParameter } from "./ParameterMapping";
import { useEditParameterSchema } from "./useEditParameterSchema";

export type EditParameterFormProps = {
    initialValues: Parameter;
    formRef: MutableRefObject<HTMLFormElement | null>;
    isParameterEditable: boolean;
} & EditParameterOptions;

export const EditParameterForm = (props: EditParameterFormProps) => {
    const { data, onSubmit, initialValues, formRef, isParameterEditable } = props;

    const parameterSchemaObject = {
        ...data,
        isParameterEditable,
    };

    const schema = useEditParameterSchema(parameterSchemaObject);

    const initialFormData = createFormDataFromParameter(initialValues, {
        canEditSensorTypeAndIspec: initialValues.status === "REQUESTED",
    });

    return (
        <FormProvider
            formRef={formRef}
            schema={schema}
            formType="edit"
            onEdit={onSubmit}
            initialValues={initialFormData}
        >
            {isParameterEditable ? (
                <EditParameterFormLayout schema={schema} initialValues={initialValues} />
            ) : (
                <FtiParameterFieldsCard parameter={initialValues} />
            )}
        </FormProvider>
    );
};
