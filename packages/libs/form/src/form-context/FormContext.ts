import type { Context } from "react";
import { createContext } from "react";
import type { DefaultValues, UnpackNestedValue, UseFormReset, UseFormReturn } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import type { FieldName, FormValues } from "../yup/utils";

export type ErrorMessageMap<Schema extends AnyObjectSchema> = Partial<{ [K in FieldName<Schema>]: string }>;
export type InitialValues<Schema extends AnyObjectSchema> = DefaultValues<FormValues<Schema>>;

export type OnEditHandler<Schema extends AnyObjectSchema> = (
    data: UnpackNestedValue<FormValues<Schema>>,
    reset: UseFormReset<FormValues<Schema>>
) => Promise<ErrorMessageMap<Schema>> | ErrorMessageMap<Schema> | Promise<void> | void;
export type EditFormProps<Schema extends AnyObjectSchema> = {
    formType: "edit";
    initialValues: InitialValues<Schema>;
    onEdit: OnEditHandler<Schema>;
};
export type OnCreateHandler<Schema extends AnyObjectSchema> = (
    data: UnpackNestedValue<FormValues<Schema>>,
    reset: UseFormReset<FormValues<Schema>>
) => Promise<ErrorMessageMap<Schema>> | ErrorMessageMap<Schema> | Promise<void> | void;
export type CreateFormProps<Schema extends AnyObjectSchema> = {
    formType: "create";
    initialValues?: DefaultValues<FormValues<Schema>>;
    onCreate: OnCreateHandler<Schema>;
};
export type DetailsFormProps<Schema extends AnyObjectSchema> = {
    formType: "details";
    initialValues: InitialValues<Schema>;
};

export type FormProps<Schema extends AnyObjectSchema> =
    | EditFormProps<Schema>
    | CreateFormProps<Schema>
    | DetailsFormProps<Schema>;

export type FormType = FormProps<AnyObjectSchema>["formType"];
export type TFormContext<Schema extends AnyObjectSchema> = UseFormReturn<FormValues<Schema>> & {
    schema: Schema;
    formType: FormType;
};

export type ReactFormContext<Schema extends AnyObjectSchema> = Context<TFormContext<Schema> | undefined>;

export const FormContext = createContext<TFormContext<AnyObjectSchema> | undefined>(undefined);
