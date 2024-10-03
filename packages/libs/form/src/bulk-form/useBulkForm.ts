import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo } from "react";
import type { DefaultValues } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import type { AnyObjectSchema } from "../yup";
import { array, object } from "../yup";
import { FIELD_ARRAY_PREFIX } from "../yup/fieldArrayPrefix";
import type { FormValues } from "../yup/utils";
import { createArrayFormControl } from "./array-form-control/ArrayFormControl";
import type { AddFormControlGroupOptions } from "./bulk-form-context/BulkFormContext";
import { createEmptyInitialValues } from "./createEmptyInitialValues";
import type { FormValuesWithSequenceIndex, InitialValues } from "./getFormValues";
import { getAddedEntities, getDeletedIds, getEditedEntities } from "./getFormValues";
import { useUnregisterFormFieldOnUnmount } from "./useUnregisterFormFieldOnUnmount";

export type OnBulkAdd<Schema extends AnyObjectSchema> = (data: FormValuesWithSequenceIndex<Schema>[]) => Promise<void>;
export type OnBulkEdit<Schema extends AnyObjectSchema> = (
    data: (FormValuesWithSequenceIndex<Schema> & { id: string })[]
) => Promise<void>;
export type OnBulkDelete = (ids: string[]) => Promise<void>;
export type PromiseResults = PromiseSettledResult<unknown>[];

export type UseBulkFormOptions<Schema extends AnyObjectSchema> = {
    schema: Schema;
    initialValues?: InitialValues<Schema>;
    onAdd: OnBulkAdd<Schema>;
    onEdit: OnBulkEdit<Schema>;
    onDelete: OnBulkDelete;
    onAfterSubmit?: (results?: PromiseResults) => void;
    useOnChangeMode?: boolean;
    isSortable?: boolean;
};

export const useBulkForm = <Schema extends AnyObjectSchema>(options: UseBulkFormOptions<Schema>) => {
    const {
        schema,
        initialValues: unformattedInitialValues,
        onAdd,
        onDelete,
        onEdit,
        onAfterSubmit,
        useOnChangeMode,
        isSortable = false,
    } = options;

    const listSchema = object({
        [FIELD_ARRAY_PREFIX]: array().of(schema),
    });

    const initialValues =
        unformattedInitialValues && unformattedInitialValues.length > 0
            ? unformattedInitialValues
            : // There's no other way of keeping the type safety except for using a type assertion here.
              ([createEmptyInitialValues(schema)] as FormValues<Schema>[]);
    const defaultValues: DefaultValues<FormValues<typeof listSchema>> = {
        [FIELD_ARRAY_PREFIX]: initialValues,
    };

    const formData = useForm({
        resolver: yupResolver(listSchema),
        defaultValues,
        ...(useOnChangeMode && { mode: "onChange" }),
    });

    const fieldArrayData = useFieldArray({
        // I can't wrap my head around why this doesn't work, hence the type assertion.
        // For some reason, TypeScript cannot infer the form field names of array types with the generic Schema type
        name: FIELD_ARRAY_PREFIX as never,
        control: formData.control,
    });

    const onSubmit = formData.handleSubmit((data) => {
        const { formFields } = data;
        const formFieldsWithSequenceIndex = formFields?.map((formField, index) => ({
            ...formField,
            sequenceIndex: index,
        }));
        const deletedIds = getDeletedIds({ initialValues, formFields: formFieldsWithSequenceIndex });
        const addedEntities = getAddedEntities({ initialValues, formFields: formFieldsWithSequenceIndex });
        const editedEntities = getEditedEntities({
            initialValues,
            formFields: formFieldsWithSequenceIndex,
            isSortable,
        });

        const actions = [];
        if (deletedIds.length > 0) {
            actions.push(onDelete(deletedIds));
        }
        if (addedEntities.length > 0) {
            actions.push(onAdd(addedEntities));
        }
        if (editedEntities.length > 0) {
            actions.push(onEdit(editedEntities));
        }

        Promise.allSettled(actions).then((results) => {
            onAfterSubmit?.(results);
        });
    });

    const { append, remove, insert, move, fields } = fieldArrayData;

    useUnregisterFormFieldOnUnmount({ schema, unregister: formData.unregister, numberOfFields: fields.length });

    const addFormControlGroup = (options: AddFormControlGroupOptions = {}) => {
        const { index, value = createEmptyInitialValues(schema) } = options;

        if (index !== undefined) {
            insert(index, value);
        } else {
            append(value);
        }
    };
    const removeFormControlGroup = (index: number) => {
        remove(index);
    };
    const getFormFieldValues = () => formData.getValues()[FIELD_ARRAY_PREFIX];

    const FormControl = useMemo(() => createArrayFormControl<Schema>(), []);

    const { formFields } = formData.watch();

    const canDuplicate = useCallback(
        (index: number) => {
            const formFieldToCheck = formFields && formFields[index];

            return (
                formFieldToCheck && Object.values(formFieldToCheck).some((value) => value !== undefined && value !== "")
            );
        },
        [formFields]
    );

    return {
        fieldArrayData,
        FormControl,
        listSchema,
        formData,
        onSubmit,
        addFormControlGroup,
        removeFormControlGroup,
        moveFormControlGroup: move,
        getFormFieldValues,
        isFormValid: formData.formState.isValid,
        canDuplicate,
    };
};
