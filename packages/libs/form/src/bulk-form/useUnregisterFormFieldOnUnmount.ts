import { useEffect } from "react";
import type { Path, UseFormUnregister } from "react-hook-form";
import { usePrevious } from "react-use";
import type { AnyObjectSchema } from "yup";
import { getTypedKeys } from "@voloiq/utils";
import { FIELD_ARRAY_PREFIX } from "../yup/fieldArrayPrefix";
import type { FormValues } from "../yup/utils";

export type UseUnregisterFormFieldOnUnmountOptions<Schema extends AnyObjectSchema> = {
    schema: Schema;
    unregister: UseFormUnregister<FormValues<Schema>>;
    numberOfFields: number;
};

export const useUnregisterFormFieldOnUnmount = <Schema extends AnyObjectSchema>(
    options: UseUnregisterFormFieldOnUnmountOptions<Schema>
) => {
    const { schema, unregister, numberOfFields } = options;

    const previousSchema = usePrevious(schema);

    useEffect(() => {
        if (previousSchema) {
            const previousFields = getTypedKeys(previousSchema.fields);
            const currentFields = getTypedKeys(schema.fields);
            const removedFields = previousFields.filter((field) => !currentFields.includes(field));
            const removedArrayFields = Array.from({ length: numberOfFields })
                .fill(undefined)
                .flatMap((_, index) =>
                    removedFields.map(
                        (field) => `${FIELD_ARRAY_PREFIX}.${index}.${String(field)}` as Path<FormValues<Schema>>
                    )
                );
            if (removedFields.length > 0) {
                unregister(removedArrayFields);
            }
        }
    }, [previousSchema, schema, unregister, numberOfFields]);
};
