import { isEqual, omit } from "lodash";
import type { DefaultValues } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import type { FormValues } from "../yup/utils";

export type InitialValues<Schema extends AnyObjectSchema> = (DefaultValues<FormValues<Schema>> & { id?: string })[];
export type FormValuesWithSequenceIndex<Schema extends AnyObjectSchema> = FormValues<Schema> & {
    sequenceIndex: number;
};
type GetFormValueOptions<Schema extends AnyObjectSchema> = {
    initialValues?: InitialValues<Schema>;
    formFields?: FormValuesWithSequenceIndex<Schema>[];
};

export const getDeletedIds = <Schema extends AnyObjectSchema>(options: GetFormValueOptions<Schema>) => {
    const { formFields, initialValues } = options;
    const initialIds: string[] = initialValues?.map((value) => value.id) ?? [];
    const dataIds: string[] = formFields?.map((formField) => formField?.id) ?? [];

    const deletedIds = initialIds?.filter((initialId) => !dataIds?.includes(initialId));

    return deletedIds;
};

export const getAddedEntities = <Schema extends AnyObjectSchema>(options: GetFormValueOptions<Schema>) => {
    const { formFields } = options;
    const addedEntities = formFields?.filter((formField) => formField?.id === undefined || formField?.id === "") ?? [];

    return addedEntities;
};

export const getEditedEntities = <Schema extends AnyObjectSchema>(
    options: GetFormValueOptions<Schema> & { isSortable: boolean }
) => {
    const { formFields, initialValues, isSortable } = options;

    return (
        formFields
            ?.filter((formField, formFieldIndex) => {
                const initialFormFieldIndex = initialValues?.findIndex(
                    (initialValue) => initialValue.id && formField?.id && initialValue.id === formField.id
                );
                const initialFormFieldExists = initialFormFieldIndex !== undefined && initialFormFieldIndex > -1;
                if (!initialFormFieldExists || initialValues === undefined) {
                    return false;
                }

                const formFieldIsReordered = isSortable && formFieldIndex !== initialFormFieldIndex;
                if (formFieldIsReordered) {
                    return true;
                }

                const initialFormField = initialValues[initialFormFieldIndex];
                return !isEqual(omit(formField, "sequenceIndex"), omit(initialFormField, "sequenceIndex"));
            })
            .filter(
                (formField): formField is NonNullable<FormValues<Schema> & { id: string }> => formField !== undefined
            ) ?? []
    );
};
