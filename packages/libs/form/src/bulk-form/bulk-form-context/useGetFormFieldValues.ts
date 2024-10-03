import { useContext } from "react";
import type { DeepPartial, UnpackNestedValue } from "react-hook-form";
import type { AnyObjectSchema, Asserts } from "yup";
import { BulkFormContext } from "./BulkFormContext";

export const useGetFormFieldValues = <Schema extends AnyObjectSchema>() => {
    const context = useContext(BulkFormContext);

    if (context === undefined) {
        throw new Error("useGetFormFieldValues must be used within BulkForm");
    }

    const { getFormFieldValues } = context;

    return { getFormFieldValues } as {
        getFormFieldValues: () =>
            | (UnpackNestedValue<UnpackNestedValue<DeepPartial<Asserts<Schema>>>> | undefined)[]
            | undefined;
    };
};
