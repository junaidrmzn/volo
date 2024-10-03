import { AnyObjectSchema, InferType, createFormControl, useForm, useWatch } from "@voloiq/form";
import { FormValues } from "./utils";

export const useFormControls = (schema: InferType<AnyObjectSchema>) => {
    const FormControl = createFormControl<typeof schema>();
    const { control, setValue, getValues } = useForm<FormValues>();
    const sampleRate = getValues("sampleRate");
    const exportFileType = useWatch({
        control,
        name: "exportFileType",
    });

    return { FormControl, control, setValue, getValues, sampleRate, exportFileType };
};
