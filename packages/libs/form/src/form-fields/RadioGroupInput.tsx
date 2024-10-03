import { HStack, Radio, RadioGroup } from "@volocopter/design-library-react";
import type { FieldPath, PathValue, UnpackNestedValue } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema, TypeOf } from "yup";
import { useForm } from "../form-context/useForm";
import { getRadioGroupMeta } from "../yup/radioButtonGroup";
import type { FieldName, FormValues } from "../yup/utils";

type RadioGroupControlProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
};

export const RadioGroupControl = <Schema extends AnyObjectSchema>(props: RadioGroupControlProps<Schema>) => {
    const { fieldName } = props;
    const { control, schema } = useForm<Schema>();

    const { options, defaultValue, horizontalSpacingBetweenOptions = 2 } = getRadioGroupMeta(schema, fieldName);
    const {
        field: { onChange, value },
    } = useController({
        control,
        name: fieldName,
        defaultValue: defaultValue as UnpackNestedValue<
            PathValue<FormValues<Schema>, keyof TypeOf<Schema> & string & FieldPath<FormValues<Schema>>>
        >,
    });

    return (
        <RadioGroup onChange={onChange} value={value} as={HStack} spacing={horizontalSpacingBetweenOptions}>
            {options.map((option) => (
                <Radio key={option.value} value={option.value} size="sm">
                    {option.label}
                </Radio>
            ))}
        </RadioGroup>
    );
};
