import { get } from "lodash";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import type { FieldPath } from "react-hook-form";
import { match } from "ts-pattern";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import { getFieldLabel, getFieldType, isFieldRequired } from "../yup/field";
import type { FieldName, FormValues } from "../yup/utils";

export type UseFormControlProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    isNotEditable?: boolean;
    isReadOnly?: boolean;
};
// For some reason, TypeScript doesn't allow it to specify the type and then use it in the UseFormControlProps
export type FormControlFieldName<Schema extends AnyObjectSchema> = UseFormControlProps<Schema>["fieldName"];

const getFormLabel = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: FieldName<Schema>,
    labelText: string
) => {
    const isRequired = isFieldRequired(schema, fieldName);
    return `${labelText}:${isRequired ? "*" : ""}`;
};

export const useFormControl = <Schema extends AnyObjectSchema>(props: UseFormControlProps<Schema>) => {
    const { fieldName, isReadOnly, isNotEditable = false } = props;
    const {
        schema,
        formState: { errors },
        formType,
        setError,
        getValues,
        setValue,
    } = useForm<Schema>();
    // manually generate an id instead of letting chakra do it so that we can use it in
    // other places like for the file input
    const controlId = useMemo(() => nanoid(), []);

    const label = getFieldLabel(schema, fieldName);
    const isDisabled = match(formType)
        .with("edit", () => isNotEditable)
        .with("create", () => isNotEditable)
        .with("details", () => true)
        .otherwise(() => false);

    return {
        controlId,
        error: get(errors, fieldName),
        fieldType: getFieldType(schema, fieldName),
        isDisabled,
        isReadOnly,
        formLabel: getFormLabel(schema, fieldName, label),
        setError,
        getValues,
        setValue,
    } as const;
};
