import { useEditParameter } from "@voloiq/flight-test-definition-api/v1";
import type { OnEditHandler } from "@voloiq/form";
import { createFormControl } from "@voloiq/form";
import type { EditParameterFormSchema } from "./editParameterFormSchema";
import { editParameterFormSchema } from "./editParameterFormSchema";
import { useEditParameterTranslation } from "./translations/useEditParameterTranslation";

export type UseEditParameterFormOptions = {
    parameterId: string;
};
export const useEditParameterForm = (options: UseEditParameterFormOptions) => {
    const { parameterId } = options;
    const { t } = useEditParameterTranslation();
    const schema = editParameterFormSchema({ t });
    const FormControl = createFormControl<EditParameterFormSchema>();
    const { editParameter } = useEditParameter(parameterId);
    const onEdit: OnEditHandler<EditParameterFormSchema> = async (data) => {
        const { acronym, name, unit } = data;
        await editParameter({ data: { acronym, name, unit } });
    };

    return { schema, FormControl, onEdit };
};
