import {
    FormControl as ChakraFormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
} from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { match } from "ts-pattern";
import type { AnyObjectSchema } from "yup";
import { Checkbox } from "../form-fields/Checkbox";
import { CoordinateInput } from "../form-fields/CoordinateInput";
import { DateTimePickerInput } from "../form-fields/DateTimePickerInput";
import { FileInput } from "../form-fields/FileInput";
import { Multiselect } from "../form-fields/Multiselect";
import { NumberInput } from "../form-fields/NumberInput";
import { RadioGroupControl } from "../form-fields/RadioGroupInput";
import { Select } from "../form-fields/Select";
import { TextEditorInput } from "../form-fields/TextEditorInput";
import { TextInput } from "../form-fields/TextInput";
import { TextareaInput } from "../form-fields/TextareaInput";
import { UnitInput } from "../form-fields/UnitInput";
import type { UseFormControlProps } from "./useFormControl";
import { useFormControl } from "./useFormControl";

export type FormControlProps<Schema extends AnyObjectSchema> = {
    helperText?: string;
    showLabel?: boolean;
    showFieldLabel?: boolean;
    onChange?: (data: unknown) => void;
    onClose?: (data: unknown) => void;
    onBlur?: (data: React.FocusEvent<HTMLInputElement>) => void;
    additionalInfo?: string;
    additionalDateTimeInfo?: (value: Date) => ReactElement | null;
    placeholder?: string;
    checkboxSize?: string;
} & UseFormControlProps<Schema>;

export const FormControl = <Schema extends AnyObjectSchema>(props: FormControlProps<Schema>) => {
    const {
        helperText,
        fieldName,
        showLabel = true,
        showFieldLabel = true,
        onChange,
        onClose,
        onBlur,
        additionalInfo,
        additionalDateTimeInfo,
        placeholder,
        checkboxSize,
    } = props;

    const { controlId, error, formLabel, fieldType, isDisabled, isReadOnly } = useFormControl(props);

    const isInvalid = !!error;

    return (
        <ChakraFormControl id={controlId} isInvalid={isInvalid} isDisabled={isDisabled}>
            {showLabel && <FormLabel additionalInfo={additionalInfo}>{formLabel}</FormLabel>}
            {match(fieldType)
                .with("select", () => <Select<Schema> fieldName={fieldName} onChange={onChange} />)
                .with("multiselect", () => (
                    <Multiselect<Schema> fieldName={fieldName} isDisabled={isDisabled} onChange={onChange} />
                ))
                .with("text", () => (
                    <TextInput<Schema>
                        fieldName={fieldName}
                        onChange={onChange}
                        isReadOnly={isReadOnly}
                        border={isReadOnly ? "transparent" : undefined}
                        background={isReadOnly ? "transparent" : undefined}
                        placeholder={placeholder}
                    />
                ))
                .with("textarea", () => <TextareaInput<Schema> fieldName={fieldName} onChange={onChange} />)
                .with("textEditor", () => <TextEditorInput<Schema> fieldName={fieldName} onChange={onChange} />)
                .with("number", () => (
                    <NumberInput<Schema>
                        fieldName={fieldName}
                        onChange={onChange}
                        onBlur={onBlur}
                        isReadOnly={isReadOnly}
                        border={isReadOnly ? "transparent" : undefined}
                        background={isReadOnly ? "transparent" : undefined}
                    />
                ))
                .with("boolean", () => (
                    <Checkbox<Schema>
                        fieldName={fieldName}
                        fieldLabel={showFieldLabel ? formLabel : undefined}
                        isDisabled={isDisabled}
                        onChange={onChange}
                        checkboxSize={checkboxSize}
                    />
                ))
                // we need to manually pass the invalid information for file inputs because chakra doesn't automatically
                // set the data-invalid attribute on the element as it's not a native input but a div element
                .with("attachment", () => (
                    <FileInput<Schema>
                        controlId={controlId}
                        fieldName={fieldName}
                        isDisabled={isDisabled}
                        isInvalid={isInvalid}
                        onChange={onChange}
                    />
                ))
                .with("datetime", "date", (fieldType) => (
                    <DateTimePickerInput<Schema>
                        mode={fieldType === "datetime" ? "dateTime" : "date"}
                        controlId={controlId}
                        isDisabled={isDisabled}
                        fieldName={fieldName}
                        onChange={onChange}
                        onClose={onClose}
                        additionalDateTimeInfo={additionalDateTimeInfo}
                    />
                ))
                .with("unit", () => <UnitInput<Schema> fieldName={fieldName} onBlur={onBlur} />)
                .with("coordinate", () => <CoordinateInput<Schema> fieldName={fieldName} onChange={onChange} />)
                .with("radioGroup", () => <RadioGroupControl<Schema> fieldName={fieldName} />)
                .exhaustive()}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            <FormErrorMessage>{error?.message}</FormErrorMessage>
        </ChakraFormControl>
    );
};

export const createFormControl =
    <Schema extends AnyObjectSchema>() =>
    (props: FormControlProps<Schema>) =>
        <FormControl {...props} />;
