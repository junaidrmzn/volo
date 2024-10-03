import { useContext } from "react";
import type { AnyObjectSchema } from "yup";
import type { FormControlFieldName } from "../../form-control/useFormControl";
import { FIELD_ARRAY_PREFIX } from "../../yup/fieldArrayPrefix";
import { ArrayFormControlContext } from "./ArrayFormControlContext";

export const useArrayFormControlFieldName = <Schema extends AnyObjectSchema>(
    fieldName: FormControlFieldName<Schema>
): FormControlFieldName<Schema> => {
    const context = useContext(ArrayFormControlContext);

    const fieldArrayPrefix =
        context === undefined
            ? fieldName
            : (`${FIELD_ARRAY_PREFIX}.${context.formControlFieldIndex}.${fieldName}` as FormControlFieldName<Schema>);

    return fieldArrayPrefix;
};
