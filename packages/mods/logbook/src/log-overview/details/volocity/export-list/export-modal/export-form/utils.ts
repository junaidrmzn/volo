import { AnyObjectSchema, InferType } from "@voloiq/form";

export type ExportFormFieldsProps = {
    schema: InferType<AnyObjectSchema>;
};

export type FormValues = InferType<ExportFormFieldsProps["schema"]>;
