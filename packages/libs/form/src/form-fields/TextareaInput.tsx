import { Textarea } from "@volocopter/design-library-react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import { getTextareaPlaceholder } from "../yup/textarea";
import type { FieldName, FormValues } from "../yup/utils";

type TextareaInputProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    onChange?: (data: unknown) => void;
};
export const TextareaInput = <Schema extends AnyObjectSchema>(props: TextareaInputProps<Schema>) => {
    const { fieldName, onChange } = props;
    const { control, schema } = useForm<Schema>();
    const {
        field: { onChange: controllerOnChange, onBlur, name, ref, value = "" },
    } = useController({ control, name: fieldName });
    const placeholder = getTextareaPlaceholder<Schema>(schema, fieldName);

    return (
        <Textarea
            onChange={(event) => {
                controllerOnChange(event);
                onChange?.(event);
            }}
            onBlur={onBlur}
            name={name}
            ref={ref}
            value={value}
            placeholder={placeholder}
        />
    );
};
