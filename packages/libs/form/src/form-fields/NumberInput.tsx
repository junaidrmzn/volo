import { NumberInput as DLNumberInput } from "@volocopter/design-library-react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import type { FieldName, FormValues } from "../yup/utils";

type NumberInputProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    onChange?: (data: unknown) => void;
    onBlur?: (data: React.FocusEvent<HTMLInputElement>) => void;
    isReadOnly?: boolean;
    border?: string;
    background?: string;
};
export const NumberInput = <Schema extends AnyObjectSchema>(props: NumberInputProps<Schema>) => {
    const { fieldName, onChange, onBlur, isReadOnly, border, background } = props;
    const { control } = useForm<Schema>();
    const {
        field: { onChange: controllerOnChange, name, ref, value },
    } = useController({ control, name: fieldName });

    return (
        <DLNumberInput
            onChange={(event) => {
                controllerOnChange(event);
                onChange?.(event);
            }}
            onBlur={onBlur}
            name={name}
            isReadOnly={isReadOnly}
            ref={ref}
            value={value}
            border={border}
            background={background}
            withStepper={!isReadOnly}
        />
    );
};
