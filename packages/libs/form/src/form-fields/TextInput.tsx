import { Input } from "@volocopter/design-library-react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import type { FieldName, FormValues } from "../yup/utils";

type TextInputProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    onChange?: (data: unknown) => void;
    isReadOnly?: boolean;
    border?: string;
    background?: string;
    placeholder?: string;
};
export const TextInput = <Schema extends AnyObjectSchema>(props: TextInputProps<Schema>) => {
    const { fieldName, onChange, isReadOnly, border, background, placeholder } = props;
    const { control } = useForm<Schema>();
    const {
        field: { onChange: controllerOnChange, onBlur, name, ref, value = "" },
    } = useController({ control, name: fieldName });

    return (
        <Input
            onChange={(event) => {
                controllerOnChange(event);
                onChange?.(event);
            }}
            onBlur={onBlur}
            isReadOnly={isReadOnly}
            name={name}
            ref={ref}
            value={value}
            border={border}
            background={background}
            placeholder={placeholder}
        />
    );
};
