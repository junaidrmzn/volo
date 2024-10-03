import { createFormControl } from "@voloiq/form";
import type { PadEventFormSchema } from "./usePadEventFormSchema";
import { usePadEventFormSchema } from "./usePadEventFormSchema";

export const usePadEventForm = () => {
    const { padEventFormSchema } = usePadEventFormSchema();
    const FormControl = createFormControl<PadEventFormSchema>();

    return { padEventFormSchema, FormControl };
};
