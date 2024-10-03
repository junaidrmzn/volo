import { MutableRefObject, ReactElement, ReactNode } from "react";
import { ConditionalWrapper } from "@voloiq/utils";
import { FormContext } from "../form-context/FormContext";
import type { FormControlProps } from "../form-control/FormControl";
import type { AnyObjectSchema } from "../yup";
import { FIELD_ARRAY_PREFIX } from "../yup/fieldArrayPrefix";
import { ArrayFormControlProvider } from "./array-form-control/ArrayFormControlProvider";
import { BulkFormContext } from "./bulk-form-context/BulkFormContext";
import { SortableItem } from "./sortable/SortableItem";
import { SortableWrapper } from "./sortable/SortableWrapper";
import type { UseBulkFormOptions } from "./useBulkForm";
import { useBulkForm } from "./useBulkForm";

export type BulkFormProps<Schema extends AnyObjectSchema> = {
    formRef?: MutableRefObject<HTMLFormElement | null>;
    renderFormControlGroup: (
        FormControl: (props: FormControlProps<Schema>) => ReactElement | null,
        index: number,
        canDuplicate?: boolean
    ) => ReactElement | null;
    children?: ReactNode;
    onFormValidityChange?: (isFormValid: boolean) => void;
    isSortable?: boolean;
} & Pick<UseBulkFormOptions<Schema>, "initialValues" | "onAdd" | "onDelete" | "onEdit" | "onAfterSubmit" | "schema">;

export const BulkForm = <Schema extends AnyObjectSchema>(props: BulkFormProps<Schema>) => {
    const {
        renderFormControlGroup,
        children,
        formRef,
        onFormValidityChange,
        isSortable = false,
        ...useBulkFormProps
    } = props;

    const useOnChangeMode = typeof onFormValidityChange !== "undefined";
    const {
        FormControl,
        fieldArrayData,
        formData,
        listSchema,
        onSubmit,
        addFormControlGroup,
        removeFormControlGroup,
        moveFormControlGroup,
        getFormFieldValues,
        isFormValid,
        canDuplicate,
    } = useBulkForm({ useOnChangeMode, isSortable, ...useBulkFormProps });
    const { fields } = fieldArrayData;
    const { initialValues } = useBulkFormProps;

    if (onFormValidityChange) onFormValidityChange(isFormValid);

    return (
        <BulkFormContext.Provider value={{ addFormControlGroup, removeFormControlGroup, getFormFieldValues }}>
            <FormContext.Provider value={{ schema: listSchema, formType: "create", ...formData }}>
                <form onSubmit={onSubmit} ref={formRef}>
                    <ConditionalWrapper
                        Wrapper={SortableWrapper}
                        wrapperProps={{
                            moveFormControlGroup,
                            fields,
                        }}
                        condition={isSortable}
                    >
                        {fields.map((field, index) => (
                            <ConditionalWrapper
                                key={field.id}
                                Wrapper={SortableItem}
                                wrapperProps={{
                                    id: field.id,
                                }}
                                condition={isSortable}
                            >
                                <ArrayFormControlProvider formControlFieldIndex={index}>
                                    {renderFormControlGroup(FormControl, index, canDuplicate(index))}
                                    {initialValues?.[index] && (
                                        <input
                                            type="hidden"
                                            name={`${FIELD_ARRAY_PREFIX}.${index}.id`}
                                            value={initialValues[index]?.id}
                                        />
                                    )}
                                </ArrayFormControlProvider>
                            </ConditionalWrapper>
                        ))}
                    </ConditionalWrapper>
                    {children}
                </form>
            </FormContext.Provider>
        </BulkFormContext.Provider>
    );
};
