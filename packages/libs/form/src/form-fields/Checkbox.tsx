import { Checkbox as ChakraCheckbox } from "@volocopter/design-library-react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import type { FieldName, FormValues } from "../yup/utils";

type CheckboxProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    fieldLabel?: string;
    isDisabled: boolean | undefined;
    onChange?: (data: unknown) => void;
    checkboxSize?: string;
};

export const Checkbox = <Schema extends AnyObjectSchema>(props: CheckboxProps<Schema>) => {
    const { fieldName, fieldLabel = "", isDisabled, onChange, checkboxSize = "lg" } = props;
    const { control } = useForm<Schema>();
    const {
        field: { onChange: controllerOnChange, name, ref, value },
    } = useController({ control, name: fieldName });
    const wordsWithSeparatorRegex = /([a-zßàáâãäçèéêíïñóôõöúüā]+)([ /_-][a-zßàáâãäçèéêíïñóôõöúüā]+)*/gi;
    const checkboxName = fieldLabel.match(wordsWithSeparatorRegex);
    return (
        <ChakraCheckbox
            onChange={(event) => {
                controllerOnChange(event);
                onChange?.(event);
            }}
            name={name}
            ref={ref}
            isChecked={value}
            isDisabled={isDisabled}
            size={checkboxSize}
        >
            {checkboxName && checkboxName.length > 0 ? checkboxName[0] : fieldLabel}
        </ChakraCheckbox>
    );
};
