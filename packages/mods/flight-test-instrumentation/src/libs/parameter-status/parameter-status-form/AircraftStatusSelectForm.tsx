import { HStack } from "@volocopter/design-library-react";
import type { ParameterStatusEnum } from "@voloiq-typescript-api/fti-types";
import type { InferType, OnCreateHandler } from "@voloiq/form";
import { FormProvider, createFormControl } from "@voloiq/form";
import { useParameterStatusFormSchema } from "./useParameterStatusFormSchema";

export type AircraftStatusSelectFormData = { status: ParameterStatusEnum; validFrom: string };
export type AircraftStatusSelectFormProps = {
    initialStatus: ParameterStatusEnum;
    formId: string;
    onSubmit: (data: AircraftStatusSelectFormData) => void;
};

export const AircraftStatusSelectForm = (props: AircraftStatusSelectFormProps) => {
    const { initialStatus, onSubmit, formId } = props;

    const schema = useParameterStatusFormSchema(initialStatus);
    type Schema = typeof schema;
    const FormControl = createFormControl<Schema>();

    const initialValues: InferType<Schema> = {
        validFrom: new Date(),
        status: { value: initialStatus },
    };
    const handleSubmit: OnCreateHandler<Schema> = (data) => {
        const { status, validFrom } = data;
        onSubmit({ status: status.value, validFrom: validFrom.toISOString() });
    };

    return (
        <FormProvider
            schema={schema}
            formType="edit"
            initialValues={initialValues}
            onEdit={handleSubmit}
            formId={formId}
        >
            <HStack>
                <FormControl fieldName="status" />
                <FormControl fieldName="validFrom" />
            </HStack>
        </FormProvider>
    );
};
