import { ReactElement } from "react";
import { ArrayFormControlProps } from "@voloiq/form";
import { getTypedKeys } from "@voloiq/utils";
import type { BaseParameterFormProps } from "./ParameterFormType";
import { ParameterFormLayout } from "./parameter-form-layout";
import { ParameterFormSchema } from "./useParameterFormSchema";

export type CreateParameterBulkFormProps = Omit<BaseParameterFormProps, "onSubmit"> & {
    FormControl: (props: ArrayFormControlProps<ParameterFormSchema>) => ReactElement | null;
    schema: ParameterFormSchema;
};

export const CreateParameterBulkForm = (props: CreateParameterBulkFormProps) => {
    const { schema, FormControl } = props;

    return (
        <ParameterFormLayout>
            <ParameterFormLayout.AircraftField>
                <FormControl fieldName="aircraft" />
            </ParameterFormLayout.AircraftField>
            {getTypedKeys(schema.fields)
                .filter((key) => key !== "aircraft" && key !== "description" && key !== "isSafetyOfFlightCritical")
                .map((key) => (
                    <ParameterFormLayout.Field key={key}>
                        <FormControl fieldName={key} />
                    </ParameterFormLayout.Field>
                ))}
            <ParameterFormLayout.Field>
                <FormControl fieldName="isSafetyOfFlightCritical" showFieldLabel={false} />
            </ParameterFormLayout.Field>
            <ParameterFormLayout.DescriptionField>
                <FormControl fieldName="description" />
            </ParameterFormLayout.DescriptionField>
        </ParameterFormLayout>
    );
};
