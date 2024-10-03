import type { FormProps, FormProviderProps } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import { DefinitionFormControls } from "./DefinitionFormControls";
import type { DefinitionFormSchema } from "./definitionFormSchema";
import { useDefinitionForm } from "./useDefinitionForm";

export type DefinitionProps = FormProps<DefinitionFormSchema> &
    Pick<FormProviderProps<DefinitionFormSchema>, "formRef" | "onAfterSubmit" | "onSubmitError" | "formId">;

export const DefinitionForm = (props: DefinitionProps) => {
    const { initialValues } = props;
    const { FormControl, schema, onChangeMasterModelOption } = useDefinitionForm({
        selectedMasterModel: initialValues?.masterModel?.value,
    });
    return (
        <FormProvider {...props} schema={schema} initialValues={{ revision: "A00" }}>
            <DefinitionFormControls FormControl={FormControl} onChangeMasterModelOption={onChangeMasterModelOption} />
        </FormProvider>
    );
};
