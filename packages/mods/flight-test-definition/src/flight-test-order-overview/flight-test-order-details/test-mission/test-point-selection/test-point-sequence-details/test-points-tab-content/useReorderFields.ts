import { useEffect } from "react";
import { FIELD_ARRAY_PREFIX, useBulkForm } from "@voloiq/form";

type UseReorderFieldsOptions = {
    fields: ReturnType<typeof useBulkForm>["fieldArrayData"]["fields"];
    setValue: ReturnType<typeof useBulkForm>["formData"]["setValue"];
    move: ReturnType<typeof useBulkForm>["fieldArrayData"]["move"];
};

export const useReorderFields = (options: UseReorderFieldsOptions) => {
    const { fields, setValue, move } = options;

    useEffect(() => {
        // Reorder the sequence index of the fields if fields order change
        for (const [index] of fields.entries()) {
            const newSequenceIndex = index + 1;
            setValue(`${FIELD_ARRAY_PREFIX}.${index}.sequenceIndex`, newSequenceIndex);
        }
    }, [fields, setValue]);

    const onDragEnd = (options: { sourceIndex: number; destinationIndex: number; id: string | number }) => {
        const { sourceIndex, destinationIndex } = options;
        move(sourceIndex, destinationIndex);
    };

    return {
        onDragEnd,
    };
};
