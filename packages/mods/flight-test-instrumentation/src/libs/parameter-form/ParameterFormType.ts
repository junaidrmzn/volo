import type { FormValues } from "@voloiq/form";
import { EditParameterFormSchema } from "./useEditParameterSchema";
import type { ParameterFormSchema, UseParameterFormSchemaProps } from "./useParameterFormSchema";

export type BaseParameterFormProps = {
    data: Required<UseParameterFormSchemaProps>;
    onSubmit: (formValues: FormValues<ParameterFormSchema>) => void;
};

export type EditParameterFormProps = {
    data: Required<UseParameterFormSchemaProps>;
    onSubmit: (formValues: FormValues<EditParameterFormSchema>) => void;
};
