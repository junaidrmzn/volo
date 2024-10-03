import type { AnyObjectSchema } from "yup";
import type { FormControlProps } from "../../form-control/FormControl";
import { FormControl } from "../../form-control/FormControl";
import { useArrayFormControlFieldName } from "./useArrayFormControlFieldName";

export type ArrayFormControlProps<Schema extends AnyObjectSchema> = FormControlProps<Schema>;

export const ArrayFormControl = <Schema extends AnyObjectSchema>(props: ArrayFormControlProps<Schema>) => {
    const { fieldName, ...rest } = props;
    const fieldNameWithPrefix = useArrayFormControlFieldName<Schema>(fieldName);

    return <FormControl {...rest} fieldName={fieldNameWithPrefix} />;
};

export const createArrayFormControl =
    <Schema extends AnyObjectSchema>() =>
    (props: ArrayFormControlProps<Schema>) =>
        <ArrayFormControl {...props} />;
