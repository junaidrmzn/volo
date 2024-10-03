import { Select as ChakraSelect } from "@volocopter/design-library-react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import type { SelectOption } from "../yup";
import { getSelectMeta } from "../yup/select";
import type { FieldName, FormValues } from "../yup/utils";

export type SelectProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    onChange?: (data: unknown) => void;
};

export const Select = <Schema extends AnyObjectSchema>(props: SelectProps<Schema>) => {
    const { fieldName, onChange } = props;
    const { control, schema } = useForm<Schema>();

    const {
        field: { onChange: controllerOnChange, onBlur, value, ref, name },
    } = useController({ control, name: fieldName });

    const { options, placeholder } = getSelectMeta(schema, fieldName);
    let selectedValue;
    if (value && value.value) {
        selectedValue = options.find((option) => option.value === value.value) ?? undefined;
    }

    return (
        <ChakraSelect<SelectOption<string | undefined>>
            ref={ref}
            onBlur={onBlur}
            value={selectedValue}
            onChange={(option) => {
                controllerOnChange(option);
                onChange?.(option);
            }}
            name={name}
            placeholder={placeholder}
            options={options}
        />
    );
};
