import { Select as ChakraMultiselect } from "@volocopter/design-library-react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import type { MultiselectOption } from "../yup/multiselect";
import { getMultiselectMeta } from "../yup/multiselect";
import type { SelectOption } from "../yup/select";
import type { FieldName, FormValues } from "../yup/utils";

export type MultiselectProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    isDisabled?: boolean;
    onChange?: (data: unknown) => void;
};

export const Multiselect = <Schema extends AnyObjectSchema>(props: MultiselectProps<Schema>) => {
    const { fieldName, isDisabled, onChange } = props;
    const { control, schema } = useForm<Schema>();
    const {
        field: { onChange: controllerOnChange, onBlur, value: values, ref, name },
    } = useController({ control, name: fieldName });
    const { options, placeholder } = getMultiselectMeta(schema, fieldName);

    const selectedValues = options
        .filter((option) => values && values.some((value: MultiselectOption) => value.value === option.value))
        .map((value): MultiselectOption => ({ ...value, isFixed: isDisabled }));

    return (
        <ChakraMultiselect<SelectOption, true>
            value={selectedValues}
            onChange={(options) => {
                controllerOnChange(options);
                onChange?.(options);
            }}
            onBlur={onBlur}
            ref={ref}
            name={name}
            options={options}
            closeMenuOnSelect={false}
            isMulti
            placeholder={placeholder}
        />
    );
};
