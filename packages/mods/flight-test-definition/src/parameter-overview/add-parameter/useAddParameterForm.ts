import type { OnCreateHandler } from "@voloiq/form";
import { createFormControl } from "@voloiq/form";
import type { AddParameterFormSchema } from "./addParameterFormSchema";
import { addParameterFormSchema } from "./addParameterFormSchema";
import { useAddParameterTranslation } from "./translations/useAddParameterTranslation";
import { useAddParameter } from "./useAddParameter";

export const useAddParameterForm = () => {
    const { t } = useAddParameterTranslation();
    const schema = addParameterFormSchema({ t });
    const FormControl = createFormControl<AddParameterFormSchema>();
    const { addParameter } = useAddParameter();
    const onCreate: OnCreateHandler<AddParameterFormSchema> = async (data) => {
        await addParameter({ data });
    };

    return { schema, FormControl, onCreate };
};
