import { FieldName, createFormControl } from "@voloiq/form";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import type { PadFormSchema } from "./usePadFormSchema";
import { usePadFormSchema } from "./usePadFormSchema";

type UsePadFormProps = {
    vertiport: Vertiport;
};

export const usePadForm = (props: UsePadFormProps) => {
    const { vertiport } = props;
    const { padsFormSchema } = usePadFormSchema({ vertiport });
    const FormControl = createFormControl<PadFormSchema>();
    const isPadFieldName = (attribute: unknown): attribute is FieldName<PadFormSchema> =>
        Object.keys(padsFormSchema.describe().fields).includes(attribute as FieldName<PadFormSchema>);

    return { padsFormSchema, FormControl, isPadFieldName };
};
