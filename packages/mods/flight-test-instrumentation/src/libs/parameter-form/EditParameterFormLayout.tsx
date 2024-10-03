import { AnyObjectSchema, createFormControl } from "@voloiq/form";
import { Parameter } from "../fti-api/apiModels";
import { ParameterFormLayout } from "./parameter-form-layout";

export type EdiParameterFormLayoutProps = {
    schema: AnyObjectSchema;
    initialValues: Parameter;
};

export const EditParameterFormLayout = (props: EdiParameterFormLayoutProps) => {
    const { initialValues, schema } = props;

    type Schema = typeof schema;
    const FormControl = createFormControl<Schema>();

    const canEditSensorTypeAndIspec = (key: string) =>
        initialValues.status === "REQUESTED" || (key !== "ataIspec" && key !== "sensorType");

    const formFields = Object.keys(schema.fields)
        .filter((key) => key !== "aircraft" && key !== "description" && key !== "isSafetyOfFlightCritical")
        .filter(canEditSensorTypeAndIspec);

    return (
        <ParameterFormLayout>
            {formFields.map((fieldName) => (
                <ParameterFormLayout.Field key={fieldName}>
                    <FormControl fieldName={fieldName} />
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
